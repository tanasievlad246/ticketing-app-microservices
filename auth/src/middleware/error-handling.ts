import { NextFunction, Request, Response } from "express";
import { BaseRequestError } from "../errors/base-error";

export const errorHandler = (err: BaseRequestError | Error, req: Request, res: Response, next: NextFunction) => {
    console.log("Something went wrong", err);
    
    if (err instanceof BaseRequestError) {
        return res.status(err.statusCode).send({
            errors: err.serializeErrors()
        });
    }

    res.status(400).send({
        errors: [{ message: "Something went wrong", error: err }]
    });
};