"use server";

import { importTransactionsSchema } from "@/schemas/transactions";
import type { ImportTransactionResult } from "@/types/transactions";
import { prisma } from "@coin-guard/db/server";
import type { ProcessedTransaction } from "@coin-guard/parser";

// Returns a result instead of throwing: messages thrown from a server action
// are masked in production builds, so they would never reach the import page.
export const ImportTransaction = async (
  transactions: ProcessedTransaction[],
  accountId: string,
): Promise<ImportTransactionResult> => {
  const account = await prisma.bankAccount.findUnique({
    where: { id: accountId },
    select: { id: true },
  });

  if (!account) {
    return {
      success: false,
      message: "The selected bank account no longer exists.",
    };
  }

  const {
    data: parsedTransactions,
    success,
    error: parsedError,
  } = importTransactionsSchema.safeParse(transactions);

  if (!success) {
    const invalidRows = new Set(parsedError.issues.map((i) => i.path[0])).size;

    return {
      success: false,
      message: `${invalidRows} of ${transactions.length} rows are invalid.`,
    };
  }

  await prisma.transaction.createMany({
    data: parsedTransactions.map((transaction) => ({
      ...transaction,
      accountId,
    })),
  });

  return { success: true };
};
