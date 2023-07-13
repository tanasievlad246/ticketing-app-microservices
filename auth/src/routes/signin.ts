import { Router } from "express";

const router = Router();

router.post("/api/users/signin", (req, res) => {
    res.json({ message: "Auth is working" });
});

export {
    router as signInUserRouter
}