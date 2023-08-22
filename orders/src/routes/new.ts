import { Request, Response, Router } from "express";
import { BadRequestError, NotFoundError, OrderStatus, requireAuth, validateRequest } from "@ticketingapporg/common";
import { body } from "express-validator";
import { Order } from "../models/Order";
import { Ticket } from "../models/Ticket";

const router = Router();

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

router.post("/api/orders", requireAuth, [
    body("ticketId").not().isEmpty().withMessage("TicketId must be provided"),
], validateRequest, async (req: Request, res: Response) => {
    const { ticketId } = req.body;

    const ticket = await Ticket.findById(ticketId).exec();

    if (!ticket) {
        throw new NotFoundError();
    }

    const isReserved = await ticket.isReserved();

    if (isReserved) {
        throw new BadRequestError("Ticket is already reserved");
    }

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    const order = await Order.build({
        userId: req.currentUser!.id,
        status: OrderStatus.Created,
        expiresAt: expiration,
        ticket
    });
    await order.save();

    // Publish an event saying that an order was created

    res.status(201).send(order);
});

export { router as createOrderRouter };
