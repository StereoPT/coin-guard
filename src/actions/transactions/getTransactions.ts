'use server';

import prisma from '@/lib/prisma';

export const GetTransactions = async () => {
  const transactions = await prisma.transaction.findMany({
    orderBy: { date: 'desc' },
    include: {
      category: true,
    },
  });

  return transactions;
};
