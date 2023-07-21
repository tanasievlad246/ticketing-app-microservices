import express, { Express, json } from "express";
import 'express-async-errors';
import cookieSession from "cookie-session";

import { errorHandler, requestsLogger, NotFoundError } from "@ticketingapporg/common";

const app: Express = express();
app.set("trust proxy", true); // Trust traffic from ingress-nginx
app.use(json());
app.use(requestsLogger);
app.use(cookieSession({
    signed: false, // Disables encryption
    secure: process.env.NODE_ENV !== "test", // Cookies only over HTTPS 
}));

app.all("*", () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
