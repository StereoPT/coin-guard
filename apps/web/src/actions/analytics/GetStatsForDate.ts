"use server";

import { GetTypeSumForDate } from "@/actions/analytics/dashboard/GetTypeSumForDate";
import { TransactionType } from "@coin-guard/db";

export const GetStatsForDate = async (dateFilter: { gte: Date; lte: Date }) => {
  const [credit, debit] = await Promise.all([
    GetTypeSumForDate(TransactionType.CREDIT, dateFilter),
    GetTypeSumForDate(TransactionType.DEBIT, dateFilter),
  ]);

  return {
    CREDIT: credit,
    DEBIT: debit,
    CASH_FLOW: credit - debit,
  };
};
