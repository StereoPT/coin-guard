'use server';

import { TransactionType } from '@/generated/prisma';
import prisma from '@/lib/prisma';
import { endOfMonth, startOfMonth, subMonths } from 'date-fns';

type TransactionValue = Record<TransactionType, number>;

export type TransactionStat = {
  value: number;
  percentage: number;
};

type GetStatsReturnValue = Record<TransactionType, TransactionStat>;

const calculatePercentageChange = (newVal: number, oldVal: number) => {
  return ((newVal - oldVal) / oldVal) * 100;
};

const createEmptyTransactionSummary = (): TransactionValue => {
  return Object.values(TransactionType).reduce(
    (acc, type) => ({ ...acc, [type]: 0 }),
    {} as TransactionValue,
  );
};

const getDateRange = (monthsBack: number) => ({
  gte: startOfMonth(subMonths(new Date(), monthsBack)),
  lte: endOfMonth(subMonths(new Date(), monthsBack)),
});

const getTransactionSummaryForPeriod = async (
  monthsBack: number,
): Promise<TransactionValue> => {
  const groupedData = await prisma.transaction.groupBy({
    by: 'type',
    _sum: { amount: true },
    where: { date: getDateRange(monthsBack) },
  });

  const summary = createEmptyTransactionSummary();

  groupedData.forEach((item) => {
    summary[item.type] = item._sum.amount ?? 0;
  });

  return summary;
};

export const GetStats = async (): Promise<GetStatsReturnValue> => {
  const [currentSummary, previousSummary] = await Promise.all([
    getTransactionSummaryForPeriod(1),
    getTransactionSummaryForPeriod(2),
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
