import { Order } from "../models/Order";
import { Request, Response, Router } from "express";
import { NotAuthorizedError, NotFoundError, OrderStatus, requireAuth } from "@ticketingapporg/common";

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

    res.send(order);
});

export { router as deleteOrderRouter };
