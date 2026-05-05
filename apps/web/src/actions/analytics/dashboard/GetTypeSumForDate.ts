"use server";

import type { TransactionType } from "@coin-guard/db";
import { prisma } from "@coin-guard/db/server";

export const GetTypeSumForDate = async (
  type: TransactionType,
  dateFilter: { gte: Date; lte: Date },
) => {
  const typeSum = await prisma.transaction.aggregate({
    _sum: { amount: true },
    where: {
      type,
      date: dateFilter,
    },
  });

  return typeSum._sum.amount ?? 0;
};
