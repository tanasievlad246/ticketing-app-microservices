import express, { Express, json } from "express";

import { currentUserRouter } from "./routes/currentuser";
import { signInUserRouter } from "./routes/signin";
import { signOutUserRouter } from "./routes/signout";
import { signUpUserRouter } from "./routes/signup";

import { errorHandler } from "./middleware/error-handling";
import { requestsLogger } from "./middleware/requests-logger";

const app: Express = express();
app.use(json());
app.use(requestsLogger);

app.use(currentUserRouter);
app.use(signInUserRouter);
app.use(signOutUserRouter);
app.use(signUpUserRouter);

app.use(errorHandler);

app.listen(3000, () => {
    console.log("Auth listening on port 3000");
});