import express, { Express } from "express";
import json from "body-parser";

import { currentUserRouter } from "./routes/currentuser";

const app: Express = express();
app.use(json());

app.use(currentUserRouter);

app.listen(3000, () => {
    console.log("Auth listening on port 3000");
});