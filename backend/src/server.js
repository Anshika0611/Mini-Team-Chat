import "../instrument.js";
import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { inngest, functions } from "./config/inngest.js";
import { serve } from "inngest/express";
import chatRoutes from "./Routes/chats.js";
import * as Sentry from "@sentry/node";
import cors from "cors";

const app = express();
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

app.use(express.json());
app.use(clerkMiddleware());

app.get("/debug-sentry", () => {
  throw new Error("My first Sentry error!");
});
app.get("/", (req, res) => {
  res.send("hey anshika");
});

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);

Sentry.setupExpressErrorHandler(app);

const startServer = async () => {
  try {
    await connectDB();
    const PORT = ENV.PORT || 5000;

    app.listen(PORT, () => {
      console.log("Server is running on port:", PORT);
    });
  } catch (err) {
    console.error("Error Starting Server");
    process.exit(1);
  }
};

startServer();

export default app;
