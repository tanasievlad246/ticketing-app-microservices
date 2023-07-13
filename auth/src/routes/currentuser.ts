import { Router } from "express";

const router = Router();

router.get("/api/users/currentuser", (req, res) => {
    res.json({ message: "Auth is working" });
});

export {
    router as currentUserRouter
}