"use server";

import type { ProcessedTransaction } from "@/actions/transactions/ParseTransaction";
import { prisma } from "@coin-guard/db/server";

export const ImportTransaction = async (
  transactions: ProcessedTransaction[],
) => {
  await prisma.transaction.createMany({ data: transactions });
};
