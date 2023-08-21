import express, { Express, json } from "express";
import 'express-async-errors';
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/currentuser";
import { signInUserRouter } from "./routes/signin";
import { signOutUserRouter } from "./routes/signout";
import { signUpUserRouter } from "./routes/signup";

import { errorHandler, NotFoundError } from "@ticketingapporg/common";

const app: Express = express();
app.set("trust proxy", true); // Trust traffic from ingress-nginx
app.use(json());
app.use(cookieSession({
    signed: false, // Disables encryption
    secure: process.env.NODE_ENV !== "test", // Cookies only over HTTPS
}));

app.use(currentUserRouter);
app.use(signInUserRouter);
app.use(signOutUserRouter);
app.use(signUpUserRouter);

app.all("*", () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
