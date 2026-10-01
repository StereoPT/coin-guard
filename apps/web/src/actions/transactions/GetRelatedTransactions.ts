"use server";

import type { DateRange } from "@/lib/date";
import { prisma } from "@coin-guard/db/server";

export const GetRelatedTransactions = async (
  description: string,
  range: DateRange,
) => {
  return prisma.transaction.findMany({
    where: {
      description: { equals: description, mode: "insensitive" },
      date: { gte: range.from, lte: range.to },
    },
    orderBy: [{ date: "asc" }, { id: "asc" }],
    include: { category: true, account: true },
  });
};
