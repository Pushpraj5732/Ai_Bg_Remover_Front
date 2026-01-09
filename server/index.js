import express from "express";
// import bodyParser from "body-parser";
import { clerkWebhook } from "./webhooks/clerk.js";

const app = express();

// app.use(bodyParser.json());

app.post("/api/webhook/clerk", clerkWebhook);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
