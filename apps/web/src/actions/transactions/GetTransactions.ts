"use server";

import { prisma } from "@coin-guard/db/server";

export const GetTransactions = async () => {
  const transactions = await prisma.transaction.findMany({
    orderBy: [{ date: "desc" }, { description: "asc" }],
    include: {
      category: true,
      account: true,
    },
  });

  return transactions;
};
