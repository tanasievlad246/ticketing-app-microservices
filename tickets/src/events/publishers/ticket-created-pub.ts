import { Subjects, TicketCreatedEvent, Publisher } from '@ticketingapporg/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
}