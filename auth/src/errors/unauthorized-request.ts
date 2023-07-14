import { BaseRequestError } from "./base-error";

export class NotAuthorizedError extends BaseRequestError {
    statusCode = 401;

    constructor() {
        super("Not authorized");

        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    serializeErrors() {
        return [
            { message: "Not authorized" }
        ];
    }
}