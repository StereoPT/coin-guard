"use server";

import { GetTransactionCountForDate } from "@/actions/analytics/dashboard/GetTransactionCountForDate";
import { GetTypeSumForDate } from "@/actions/analytics/dashboard/GetTypeSumForDate";

import type { TransactionStat } from "@/types/analytics";
import { TransactionType } from "@coin-guard/db";
import { endOfMonth, startOfMonth, subMonths } from "date-fns";

type GetStatsReturnValue = Record<
  "CREDIT" | "DEBIT" | "TRANSACTIONS",
  TransactionStat
>;

const calculatePercentageChange = (newVal: number, oldVal: number) => {
  return ((newVal - oldVal) / oldVal) * 100;
};

export const GetDashboardStats = async (): Promise<GetStatsReturnValue> => {
  const dateFilterCurrentMonth = {
    gte: startOfMonth(subMonths(new Date(), 1)),
    lte: endOfMonth(subMonths(new Date(), 1)),
  };

  const dateFilterPreviousMonth = {
    gte: startOfMonth(subMonths(new Date(), 2)),
    lte: endOfMonth(subMonths(new Date(), 2)),
  };

  const [currentIncome, previousIncome] = await Promise.all([
    GetTypeSumForDate(TransactionType.CREDIT, dateFilterCurrentMonth),
    GetTypeSumForDate(TransactionType.CREDIT, dateFilterPreviousMonth),
  ]);

  const [currentExpense, previousExpense] = await Promise.all([
    GetTypeSumForDate(TransactionType.DEBIT, dateFilterCurrentMonth),
    GetTypeSumForDate(TransactionType.DEBIT, dateFilterPreviousMonth),
  ]);

  const [currentTransactions, previousTransactions] = await Promise.all([
    GetTransactionCountForDate(dateFilterCurrentMonth),
    GetTransactionCountForDate(dateFilterPreviousMonth),
  ]);

  const result: GetStatsReturnValue = {
    CREDIT: {
      value: currentIncome,
      percentage: calculatePercentageChange(currentIncome, previousIncome),
    },
    DEBIT: {
      value: currentExpense,
      percentage: calculatePercentageChange(currentExpense, previousExpense),
    },
    TRANSACTIONS: {
      value: currentTransactions,
      percentage: calculatePercentageChange(
        currentTransactions,
        previousTransactions,
      ),
    },
  };

  return result;
};
