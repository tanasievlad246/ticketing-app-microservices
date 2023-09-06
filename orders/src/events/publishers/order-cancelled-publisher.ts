import { Subjects, Publisher, OrderCancelledEvent } from "@ticketingapporg/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}