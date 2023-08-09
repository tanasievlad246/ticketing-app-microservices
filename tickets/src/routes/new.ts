import { Router, Request, Response } from 'express';
import { requireAuth, validateRequest } from '@ticketingapporg/common';
import { body } from 'express-validator';
import { Ticket } from '../models/Ticket';
import { natsWrapper } from '../nats-wrapper';
import { TicketCreatedPublisher } from '../events/publishers/ticket-created-pub';

const router = Router();

router.post('/api/tickets', requireAuth, [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price').isFloat({
        gt: 0
    }).withMessage('Price must be greater than 0')
], validateRequest, (req: Request, res: Response) => {
    const { title, price } = req.body;
    const ticket = Ticket.build({
        title,
        price,
        userId: req.currentUser!.id
    });
    ticket.save();

    new TicketCreatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        title: ticket.title + "",
        price: ticket.price,
    });
    res.status(201).send(ticket);
});

export { router as createTicketRouter };
