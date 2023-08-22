import express, { Express, json } from "express";
import 'express-async-errors';
import cookieSession from "cookie-session";

import { errorHandler, NotFoundError, currentUser } from "@ticketingapporg/common";

import { createOrderRouter } from "./routes/new";
import { showOrderRouter } from "./routes/show";
import { deleteOrderRouter } from "./routes/delete";

const app: Express = express();
app.set("trust proxy", true); // Trust traffic from ingress-nginx
app.use(json());
app.use(cookieSession({
    signed: false, // Disables encryption
    secure: process.env.NODE_ENV !== "test", // Cookies only over HTTPS
}));

app.use(currentUser);

app.use(createOrderRouter);
app.use(showOrderRouter);
app.use(deleteOrderRouter);

app.all("*", () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };