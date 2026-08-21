"use server";

import type { DateRange } from "@/lib/date";
import { prisma } from "@coin-guard/db/server";

export const GetCategoryTransactions = async (
  categoryId: string,
  range: DateRange,
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
