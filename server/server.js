import "./config/instrument.js";

import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node";
import clerkWebhooks from "./controllers/webhook.js";

const app = express();


await connectDB();


app.use(cors());





app.post(
  "/api/webhooks/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Working");
});

app.get("/debug-sentry", () => {
  throw new Error("My first Sentry error!");
});


Sentry.setupExpressErrorHandler(app);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
