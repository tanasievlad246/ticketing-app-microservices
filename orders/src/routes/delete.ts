import { Order } from "../models/Order";
import { Request, Response, Router } from "express";
import { OrderStatus } from "@ticketingapporg/common";

const router = Router();

router.delete("/api/orders/:orderId", async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
        throw new Error("Order not found");
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    res.send(order);
});

export { router as deleteOrderRouter };
