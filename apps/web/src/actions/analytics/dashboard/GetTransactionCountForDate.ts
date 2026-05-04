"use server";

import { prisma } from "@coin-guard/db/server";

export const GetTransactionCountForDate = async (dateFilter: {
  gte: Date;
  lte: Date;
}) => {
  const transactionCount = await prisma.transaction.count({
    where: {
      date: dateFilter,
    },
  });

  return transactionCount;
};
