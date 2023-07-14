import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface UserPayload {
    id: string;
    email: string;
}

// Augment the Request interface with a currentUser property that is optional and of type UserPayload
// This is a workaround for the fact that TypeScript doesn't know about the existence of the currentUser property
// Reaching into the Express library and modifying the Request interface
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.session?.jwt) {
        return next();
    }

    try {
        const payload = verify(req.session.jwt, process.env.JWT_KEY!);
        req.currentUser = payload as UserPayload;
    } catch (err) {}
    next();
}

