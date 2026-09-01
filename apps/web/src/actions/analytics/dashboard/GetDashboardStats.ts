"use server";

import { GetTransactionCountForDate } from "@/actions/analytics/dashboard/GetTransactionCountForDate";
import { GetTypeSumForDate } from "@/actions/analytics/dashboard/GetTypeSumForDate";

import type { Trend, TransactionStat } from "@/types/analytics";
import { TransactionType } from "@coin-guard/db";
import { endOfMonth, startOfMonth, subMonths } from "date-fns";

type GetStatsReturnValue = Record<
  "CREDIT" | "DEBIT" | "TRANSACTIONS",
  TransactionStat
>;

const getTrend = (newVal: number, oldVal: number): Trend => {
  if (newVal === oldVal) return "flat";
  return newVal > oldVal ? "up" : "down";
};

const calculatePercentageChange = (newVal: number, oldVal: number) => {
  if (newVal === oldVal) return 0;
  if (oldVal === 0) return null;
  return ((newVal - oldVal) / oldVal) * 100;
};

const buildStat = (newVal: number, oldVal: number): TransactionStat => ({
  value: newVal,
  percentage: calculatePercentageChange(newVal, oldVal),
  trend: getTrend(newVal, oldVal),
});

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
    CREDIT: buildStat(currentIncome, previousIncome),
    DEBIT: buildStat(currentExpense, previousExpense),
    TRANSACTIONS: buildStat(currentTransactions, previousTransactions),
  };

  return result;
};
