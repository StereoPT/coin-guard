'use server';

import prisma from '@/lib/prisma';

export const GetTransaction = async (id: string) => {
  return await prisma.$transaction(async (prisma) => {
    const transaction = await prisma.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      throw new Error('Transaction not found!');
    }

    const all = await prisma.transaction.findMany({
      where: { description: transaction.description },
    });

    return { transaction, all };
  });
};
