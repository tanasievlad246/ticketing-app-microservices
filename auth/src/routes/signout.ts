import { Router } from "express";

const router = Router();

router.post("/api/users/signout", (req, res) => {
    res.json({ message: "Auth is working" });
});

export {
    router as signOutUserRouter
}