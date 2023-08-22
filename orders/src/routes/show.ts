import { Request, Response, Router } from "express";
import { Order } from "../models/Order";
import { NotAuthorizedError, requireAuth } from "@ticketingapporg/common";

const router = Router();

router.get("/api/orders/:orderId", requireAuth, async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate("ticket").exec();

    if (!order) {
        throw new Error("Order not found");
    }

    if (order.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }

    res.send(order);
});

router.get("/api/orders", requireAuth, async (req: Request, res: Response) => {
    const orders = await Order.find({ userId: req.currentUser!.id }).populate("ticket").exec();

    res.send(orders);
});

export { router as showOrderRouter };
