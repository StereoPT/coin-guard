"use server";

import { TransactionType } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import type { StatCardsType } from "@/types/analytics";

const createEmptyTransactionSummary = (): StatCardsType => {
  return Object.values(TransactionType).reduce(
    (acc, type) => ({ ...acc, [type]: 0 }),
    {} as StatCardsType,
  );
};

export const GetStatsForDate = async (dateFilter: { gte: Date; lte: Date }) => {
  const groupedData = await prisma.transaction.groupBy({
    by: "type",
    _sum: { amount: true },
    where: {
      date: dateFilter,
    },
  });

  const summary = createEmptyTransactionSummary();

  groupedData.forEach((item) => {
    summary[item.type] = item._sum.amount ?? 0;
  });

  summary.CASH_FLOW = summary.CREDIT - summary.DEBIT;

  return summary;
};
