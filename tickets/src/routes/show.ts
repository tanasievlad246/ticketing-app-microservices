import { Router, Request, Response } from 'express';
import { Ticket } from '../models/Ticket';
import { NotFoundError } from '@ticketingapporg/common';

const router = Router();

router.get('/api/tickets', async (req: Request, res: Response) => {
    const tickets = await Ticket.find({}).exec();
    res.status(200).json(tickets);
});

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const ticket = await Ticket.findById(id).exec();

    if (!ticket) {
        throw new NotFoundError();
    }
    console.log('ticket from database',ticket);
    res.status(200).json(ticket);
});

export { router as indexTicketRouter };
