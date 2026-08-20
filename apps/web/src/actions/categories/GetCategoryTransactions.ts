"use server";

import type { AnalyticsDateRange } from "@/lib/date";
import { prisma } from "@coin-guard/db/server";

export const GetCategoryTransactions = async (
  categoryId: string,
  range: AnalyticsDateRange,
) => {
  return prisma.transaction.findMany({
    where: {
      categoryId,
      date: { gte: range.from, lte: range.to },
    },
    orderBy: [{ date: "asc" }, { description: "asc" }],
    include: { category: true, account: true },
  });
};
