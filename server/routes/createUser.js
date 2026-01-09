import { prisma } from "../lib/prisma.js";

export const createUserIfNotExists = async (clerkUserId) => {
  const existingUser = await prisma.userCredit.findUnique({
    where: { clerkUserId },
  });

  if (!existingUser) {
    await prisma.userCredit.create({
      data: {
        clerkUserId,
        credits: 10, // free credits
      },
    });
  }
};
