import { Router } from "express";
import { body, validationResult } from "express-validator";
import { Request, Response } from "express";
import { RequestValidationError } from "../errors/request-validation";
import { User } from "../models/User";
import { BadRequestError } from "../errors/bad-request";
import { Jwt, sign } from "jsonwebtoken";

const router = Router();

router.post("/api/users/signup", [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().isLength({ min: 4, max: 20 }).withMessage("Password must be between 4 and 20 characters")
], async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }

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
    }, 'asdf');

    req.session = {
        jwt: userJwt
    };

    res.status(201).send(newUser);

});

export {
    router as signUpUserRouter
}