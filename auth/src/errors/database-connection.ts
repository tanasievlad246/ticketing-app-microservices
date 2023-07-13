import { BaseRequestError } from "./base-error";

export class DatabaseConnectionError extends BaseRequestError {
    reason = "Error connecting to database";
    statusCode = 500;

    constructor() {
        super("Error connecting to database");
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [
            { message: this.reason }
        ];
    }
}