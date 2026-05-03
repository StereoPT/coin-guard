"use server";

import { prisma } from "@coin-guard/db/server";

export const GetLastTransactions = async (amount: number) => {
  const transactions = await prisma.transaction.findMany({
    orderBy: {
      date: "desc",
    },
    take: amount,
  });

  return transactions;
};
