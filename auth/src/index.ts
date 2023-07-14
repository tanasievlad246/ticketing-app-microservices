import express, { Express, json } from "express";
import 'express-async-errors';
import cookieSession from "cookie-session";
import mongoose from "mongoose";

import { currentUserRouter } from "./routes/currentuser";
import { signInUserRouter } from "./routes/signin";
import { signOutUserRouter } from "./routes/signout";
import { signUpUserRouter } from "./routes/signup";

import { errorHandler } from "./middleware/error-handling";
import { requestsLogger } from "./middleware/requests-logger";
import { NotFoundError } from "./errors/not-found";

const app: Express = express();
app.set("trust proxy", true); // Trust traffic from ingress-nginx
app.use(json());
app.use(requestsLogger);
app.use(cookieSession({
    signed: false, // Disables encryption
    secure: true, // Only allow HTTPS connections
}));

app.use(currentUserRouter);
app.use(signInUserRouter);
app.use(signOutUserRouter);
app.use(signUpUserRouter);

app.all("*", () => {
    throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY must be defined");
    }
    
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            autoIndex: true,
        });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error(err);
    }
};

app.listen(3000, async () => {
    await start();
    console.log("Auth listening on port 3000");
});