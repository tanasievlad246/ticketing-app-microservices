export abstract class BaseRequestError extends Error {
    abstract statusCode: number;

    constructor(message: string) {
        super(message);
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, BaseRequestError.prototype);
    }

    abstract serializeErrors(): {
        message: string;
        field?: string;
    }[];
}