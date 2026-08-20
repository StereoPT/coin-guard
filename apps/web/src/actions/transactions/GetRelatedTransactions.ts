"use server";

import type { DateRange } from "@/lib/date";
import { prisma } from "@coin-guard/db/server";

export const GetRelatedTransactions = async (
  description: string,
  range: DateRange,
) => {
  return prisma.transaction.findMany({
    where: {
      description,
      date: { gte: range.from, lte: range.to },
    },
    // description is constant here (filtered above), so id is the tiebreaker
    orderBy: [{ date: "asc" }, { id: "asc" }],
    include: { category: true, account: true },
  });
};
