import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { inngest,functions } from "./config/inngest.js";
import { serve } from "inngest/express";
const app = express();

app.use(express.json());

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send("hey anshika");
});
const startServer = async () => {
  try {
    await connectDB();
    if (ENV.NODE_ENV !== 'production') {
      app.listen(ENV.PORT, () => {
        console.log("Server is running on port:", ENV.PORT);
      });
    }
  } catch (err) {
    console.error("Error Starting Server");
    process.exit(1);
  }
};
startServer();

export default app;
