import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middleware/validate-request";
import { User } from "../models/User";
import { Password } from "../utils/Password";
import { BadRequestError } from "../errors/bad-request";
import { sign } from "jsonwebtoken";

const router = Router();

router.post("/api/users/signin", [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage('You must supply a password'),
    validateRequest
], async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
        throw new BadRequestError("Invalid email");
    }

    const passwordMatch = await Password.compare(user.password, password);
    console.log(passwordMatch)
    if (!passwordMatch) {
        throw new BadRequestError("Invalid password");
    }

    const userJwt = sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!); // ! tells TS that we know that JWT_KEY is defined

    req.session = {
        jwt: userJwt
    };

    res.status(200).send(user);
});

export {
    router as signInUserRouter
}