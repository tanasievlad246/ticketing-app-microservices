import express, { Express, json } from "express";
import 'express-async-errors';
import cookieSession from "cookie-session";

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

export { app };
