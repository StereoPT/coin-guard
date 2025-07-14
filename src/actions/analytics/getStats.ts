'use server';

import { TransactionType } from '@/generated/prisma';
import prisma from '@/lib/prisma';
import { endOfMonth, startOfMonth, subMonths } from 'date-fns';

type TransactionSummary = Record<TransactionType, number>;

export const GetStats = async () => {
  const groupedData = await prisma.transaction.groupBy({
    by: 'type',
    _sum: {
      amount: true,
    },
    where: {
      date: {
        gte: startOfMonth(subMonths(new Date(), 1)),
        lte: endOfMonth(subMonths(new Date(), 1)),
      },
    },
  });

  const summary: TransactionSummary = Object.values(TransactionType).reduce(
    (acc, type) => {
      acc[type] = 0;
      return acc;
    },
    {} as TransactionSummary,
  );

  groupedData.forEach((item) => {
    summary[item.type] = item._sum.amount || 0;
  });

  return summary;
};
