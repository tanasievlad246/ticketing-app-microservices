import { Router, Request, Response } from 'express';
import { Ticket } from '../models/Ticket';
import { NotFoundError, validateRequest, requireAuth, NotAuthorizedError } from '@ticketingapporg/common';
import { body } from 'express-validator';
import { TicketUpdatedPublisher } from '../events/publishers/ticket-updated-pub';
import { natsWrapper } from '../nats-wrapper';

const router = Router();

router.put('/api/tickets/:id', requireAuth, [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0')
], validateRequest, async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id).exec();

    if (!ticket) {
        throw new NotFoundError();
    }

    if (ticket.userId !== req.currentUser?.id) {
        throw new NotAuthorizedError();
    }

    ticket.set({
        title: req.body.title,
        price: req.body.price
    });

    await ticket.save();

    new TicketUpdatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId,
        version: 1
    });

    res.status(200).send(ticket);
});

export { router as updateTicketRouter };
