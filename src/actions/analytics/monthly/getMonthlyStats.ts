"use server";

import { TransactionType } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import type { TransactionValue } from "@/types/transactions";
import { endOfMonth, startOfMonth } from "date-fns";

export type MonthlyTransactionValue = TransactionValue & { CASH_FLOW: number };

const createEmptyTransactionSummary = (): MonthlyTransactionValue => {
  return Object.values(TransactionType).reduce(
    (acc, type) => ({ ...acc, [type]: 0 }),
    {} as MonthlyTransactionValue,
  );
};

export const GetMonthlyStats = async (month: number) => {
  const groupedData = await prisma.transaction.groupBy({
    by: "type",
    _sum: { amount: true },
    where: {
      date: {
        gte: startOfMonth(new Date(2025, month, 1)),
        lte: endOfMonth(new Date(2025, month, 1)),
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
