import { Router } from "express";
import { currentUser } from "../middleware/current-user";

const router = Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {

    res.json({ currentUser: req.currentUser || null });
});

export {
    router as currentUserRouter
}