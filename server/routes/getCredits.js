// server/routes/getCredits.js (example)
import { prisma } from "../lib/prisma.js";

export const getCredits = async (req, res) => {
  const clerkUserId = req.auth.userId;

  const user = await prisma.userCredit.findUnique({
    where: { clerkUserId },
  });

  res.json({ credits: user?.credits ?? 0 });
};
await prisma.userCredit.update({
  where: { clerkUserId },
  data: { credits: { decrement: 1 } },
});
