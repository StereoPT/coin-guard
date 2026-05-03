"use server";

import { prisma } from "@coin-guard/db/server";

export const GetTransactions = async () => {
  const transactions = await prisma.transaction.findMany({
    orderBy: { date: "desc" },
    include: {
      category: true,
    },
  });

  return transactions;
};
