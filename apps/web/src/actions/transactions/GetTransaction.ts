"use server";

import { prisma } from "@coin-guard/db/server";

export const GetTransaction = async (transactionId: string) => {
  const transaction = await prisma.transaction.findUnique({
    where: { id: transactionId },
    include: { category: true, account: true },
  });

  if (!transaction) {
    throw new Error(`Transaction with ID ${transactionId} not found`);
  }

  return transaction;
};
