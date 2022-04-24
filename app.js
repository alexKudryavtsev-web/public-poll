import express from "express";
import config from "config";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import pollRouter from "./routes/poll.routes.js";
import replyRouter from "./routes/reply.routes.js";
import redirectRouter from "./routes/redirect.routes.js";

import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: config.get("CLIENT_URL") }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/poll", pollRouter);
app.use("/api/reply", replyRouter);
app.use("/t", redirectRouter);

app.use(errorMiddleware);

async function start() {
  try {
    const PORT = config.get("PORT");

    await mongoose.connect(config.get("DB_URL"));

    app.listen(PORT, () => {
      console.log(`Server has started on ${PORT}`);
    });
  } catch (e) {
    console.log(`Server has failed`);
    process.exit(1);
  }
}

start();
