import { Webhook } from "svix";
import { prisma } from "../lib/prisma.js";

export const clerkWebhook = async (req, res) => {
  const secret = process.env.CLERK_WEBHOOK_SECRET;

  const payload = req.body;
  const headers = req.headers;

  const wh = new Webhook(secret);

  let event;
  try {
    event = wh.verify(payload, headers);
  } catch (err) {
    return res.status(400).send("Invalid signature");
  }

  if (event.type === "user.created") {
    const clerkUserId = event.data.id;

    // ✅ prevent duplicates
    const existingUser = await prisma.userCredit.findUnique({
      where: { clerkUserId },
    });

    if (!existingUser) {
      await prisma.userCredit.create({
        data: {
          clerkUserId,
          credits: 5, // free credits
        },
      });
    }
  }

  res.status(200).json({ success: true });
};
