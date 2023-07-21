import { Router } from "express";
import { body } from "express-validator";
import { Request, Response } from "express";
import { User } from "../models/User";
import { BadRequestError, validateRequest } from "@ticketingapporg/common";
import { sign } from "jsonwebtoken";

const router = Router();

router.post("/api/users/signup", [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().isLength({ min: 4, max: 20 }).withMessage("Password must be between 4 and 20 characters"),
    validateRequest
], async (req: Request, res: Response) => {

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
        throw new BadRequestError("Email already in use");
    } 

    const newUser = User.build({ email, password });
    await newUser.save();
    const userJwt = sign({
        id: newUser.id,
        email: newUser.email
    }, process.env.JWT_KEY!); // ! tells TS that we know that JWT_KEY is defined

    req.session = {
        jwt: userJwt
    };

    res.status(201).send(newUser);

});

export {
    router as signUpUserRouter
}