import {  Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketCreatedEvent } from '@ticketingapporg/common';
import { Ticket } from '../../models/Ticket';
import { queueGroupName } from './queue-group-name';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName: string = queueGroupName;
    async onMessage(data: TicketCreatedEvent['data'], msg: Message): Promise<void> {
        const { id, title, price } = data;
        await Ticket.build({
            id,
            title,
            price,
        }).save();
        msg.ack();
    }
}