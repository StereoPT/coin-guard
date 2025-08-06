'use server';

import prisma from '@/lib/prisma';

export const GetTransaction = async (id: string) => {
  return await prisma.$transaction(async (prisma) => {
    const transaction = await prisma.transaction.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!transaction) {
      throw new Error('Transaction not found!');
    }

    const all = await prisma.transaction.findMany({
      where: { description: transaction.description },
      orderBy: { date: 'asc' },
      include: {
        category: true,
      },
    });

    return { transaction, all };
  });
};
