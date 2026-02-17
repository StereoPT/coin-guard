"use server";

import { GetStatsForDate } from "@/actions/analytics/getStatsForDate";
import { TransactionType } from "@/generated/prisma/enums";

import type { TransactionStat } from "@/types/analytics";
import { endOfMonth, startOfMonth, subMonths } from "date-fns";

type GetStatsReturnValue = Record<TransactionType, TransactionStat>;

const calculatePercentageChange = (newVal: number, oldVal: number) => {
  return ((newVal - oldVal) / oldVal) * 100;
};

export const GetStats = async (): Promise<GetStatsReturnValue> => {
  const dateFilterOne = {
    gte: startOfMonth(subMonths(new Date(), 1)),
    lte: endOfMonth(subMonths(new Date(), 1)),
  };

  const dateFilterTwo = {
    gte: startOfMonth(subMonths(new Date(), 2)),
    lte: endOfMonth(subMonths(new Date(), 2)),
  };

  const [currentSummary, previousSummary] = await Promise.all([
    GetStatsForDate(dateFilterOne),
    GetStatsForDate(dateFilterTwo),
  ]);

  const result = Object.values(TransactionType).reduce(
    (acc, type) => ({
      ...acc,
      [type]: {
        value: currentSummary[type],
        percentage: calculatePercentageChange(
          currentSummary[type],
          previousSummary[type],
        ),
      },
    }),
    {} as GetStatsReturnValue,
  );

  return result;
};
