import { Subjects, OrderCreatedEvent, Publisher } from "@ticketingapporg/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}