import { Router } from "express";
import { currentUser } from "../middleware/current-user";
import { requireAuth } from "../middleware/require-auth";

const router = Router();

router.get("/api/users/currentuser", currentUser, requireAuth, (req, res) => {

    res.json({ currentUser: req.currentUser || null });
});

export {
    router as currentUserRouter
}