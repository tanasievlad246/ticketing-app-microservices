import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY must be defined");
    }
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI must be defined");
    }
    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error("NATS_CLUSTER_ID env var must be defined");
    }
    if (!process.env.NATS_CLIENT_ID) {
        throw new Error("NATS_CLIENT_ID env var must be defined");
    }
    if (!process.env.NATS_URL) {
        throw new Error("NATS_URL env var must be defined");
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            autoIndex: true,
        });
        console.log("Orders Connected to MongoDB");
        await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL);
        natsWrapper.client.on('close', () => {
            console.log('Orders NATS connection closed!');
            process.exit();
        });
        process.on("SIGINT", () => natsWrapper.client.close());
        process.on("SIGTERM", () => natsWrapper.client.close());
    } catch (err) {
        console.error(err);
    }
};

app.listen(3000, async () => {
    await start();
    console.log("Orders listening on port 3000");
});