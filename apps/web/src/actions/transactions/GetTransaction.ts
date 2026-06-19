"use server";

import { prisma } from "@coin-guard/db/server";

export const GetTransaction = async (transactionId: string) => {
  return await prisma.$transaction(async (prisma) => {
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
      include: {
        category: true,
      },
    });

    if (!transaction) {
      throw new Error(`Transaction with ID ${transactionId} not found`);
    }

    const all = await prisma.transaction.findMany({
      where: { description: transaction.description },
      orderBy: { date: "asc" },
      include: {
        category: true,
      },
    });

    return { transaction, all };
  });
};
