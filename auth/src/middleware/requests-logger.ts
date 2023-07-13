import { Request, Response, NextFunction } from 'express';

export const requestsLogger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`\x1b[33m ${req.method.toUpperCase()} \x1b[0m`, req.originalUrl);
    console.log(`\x1b[36m ${JSON.stringify(req.body)} \x1b[0m`);
    next();
}