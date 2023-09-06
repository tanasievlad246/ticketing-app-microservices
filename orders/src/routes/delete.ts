import { Order } from "../models/Order";
import { Request, Response, Router } from "express";
import { NotAuthorizedError, NotFoundError, OrderStatus, requireAuth } from "@ticketingapporg/common";
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher'
import { natsWrapper } from "../nats-wrapper";

const router = Router();

router.delete("/api/orders/:orderId", requireAuth, async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
        throw new NotFoundError();
    }

    if (req.currentUser!.id !== order.userId) {
        throw new NotAuthorizedError();
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    await new OrderCancelledPublisher(natsWrapper.client).publish({
        id: order.id,
        ticket: {
            id: order.ticket.id,
        }
    });

    res.send(order);
});

export { router as deleteOrderRouter };
