import { prisma } from "../lib/prisma.js";

export const removeBg = async (req, res) => {
  const clerkUserId = req.auth.userId;

  const user = await prisma.userCredit.findUnique({
    where: { clerkUserId },
  });

  if (!user || user.credits <= 0) {
    return res.status(403).json({ error: "No credits left" });
  }

  // 1️⃣ Call AI Background Remover API
  // await removeBackground(image)

  // 2️⃣ Deduct credit ONLY after success
  await prisma.userCredit.update({
    where: { clerkUserId },
    data: { credits: { decrement: 1 } },
  });

  res.json({ success: true });
};
