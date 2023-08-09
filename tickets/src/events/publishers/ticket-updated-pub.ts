import { Subjects, Publisher, TicketUpdatedEvent } from '@ticketingapporg/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
}