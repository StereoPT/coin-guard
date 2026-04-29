"use server";

import type { ProcessedTransaction } from "@/actions/transactions/parseTransaction";
import { prisma } from "@/lib/prisma";

export const ImportTransaction = async (
  transactions: ProcessedTransaction[],
) => {
  try {
    await prisma.transaction.createMany({ data: transactions });
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: error logging
    console.error("Failed to import transactions", error);
    throw new Error("Failed to import transactions!");
  }
};
