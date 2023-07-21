import { Router } from "express";
import { currentUser, requireAuth } from "@ticketingapporg/common";

const router = Router();

router.get("/api/users/currentuser", currentUser, requireAuth, (req, res) => {

    res.json({ currentUser: req.currentUser || null });
});

export {
    router as currentUserRouter
}