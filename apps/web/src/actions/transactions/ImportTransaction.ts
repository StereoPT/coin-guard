"use server";

import { prisma } from "@coin-guard/db/server";
import type { ProcessedTransaction } from "@coin-guard/parser";

export const ImportTransaction = async (
  transactions: ProcessedTransaction[],
  accountId: string,
) => {
  await prisma.transaction.createMany({
    data: transactions.map((transaction) => ({ ...transaction, accountId })),
  });
};
