import { BaseRequestError } from "./base-error";

export class NotFoundError extends BaseRequestError {
    statusCode = 404;

    constructor() {
        super("Route not found");
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors() {
        return [
            { message: "Not Found" }
        ];
    }
}