import { ValidationError } from "express-validator";
import { BaseRequestError } from "./base-error";

export class RequestValidationError extends BaseRequestError {
    statusCode = 400;

    constructor(public errors: ValidationError[]) {
        super("Invalid request parameters");
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    public serializeErrors() {
        return this.errors.map(error => {
            return { message: error.msg, error };
        });
    }
}
