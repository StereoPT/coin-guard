"use server";

import { TransactionType } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import type { StatCardsType } from "@/types/analytics";
import { endOfYear, startOfYear } from "date-fns";

const createEmptyTransactionSummary = (): StatCardsType => {
  return Object.values(TransactionType).reduce(
    (acc, type) => ({ ...acc, [type]: 0 }),
    {} as StatCardsType,
  );
};

export const getYearlyStats = async (year: number) => {
  const groupedData = await prisma.transaction.groupBy({
    by: "type",
    _sum: { amount: true },
    where: {
      date: {
        gte: startOfYear(new Date(year, 1, 1)),
        lte: endOfYear(new Date(year, 1, 1)),
      },
    },
  });

  const summary = createEmptyTransactionSummary();

  groupedData.forEach((item) => {
    summary[item.type] = item._sum.amount ?? 0;
  });

  summary.CASH_FLOW = summary.CREDIT - summary.DEBIT;

  return summary;
};
