'use server';

import prisma from '@/lib/prisma';

export const GetLastTransactions = async (amount: number) => {
  const transactions = await prisma.transaction.findMany({
    orderBy: {
      date: 'desc',
    },
    take: amount,
  });

  return transactions;
};
