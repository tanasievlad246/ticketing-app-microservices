import express from "express";
import json from "body-parser";

const app = express();
app.use(json());

app.get("/api/auth", (req, res) => {
    res.json({ message: "Auth is working" });
});

app.listen(3000, () => {
    console.log("Auth listening on port 3000");
});