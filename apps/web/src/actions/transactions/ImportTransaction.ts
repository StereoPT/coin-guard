"use server";

import { importTransactionsSchema } from "@/schemas/transactions";
import type { ImportTransactionResult } from "@/types/transactions";
import { LoggingType, LookupField, type Prisma } from "@coin-guard/db";
import { prisma } from "@coin-guard/db/server";
import type { ProcessedTransaction } from "@coin-guard/parser";

const buildMissLog = (
  lookupField: LookupField,
  description: string,
): Prisma.LookupLoggingCreateManyInput => ({
  type: LoggingType.ERROR,
  lookupField,
  description: `No match for '${description}'`,
});

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

  const lookupLogs: Prisma.LookupLoggingCreateManyInput[] = [];

  for (const transaction of transactions) {
    if (transaction.descriptionMatched === false) {
      lookupLogs.push(
        buildMissLog(LookupField.DESCRIPTION, transaction.description),
      );
    }

    if (transaction.categoryMatched === false) {
      lookupLogs.push(
        buildMissLog(LookupField.CATEGORY, transaction.description),
      );
    }
  }

  await prisma.$transaction([
    prisma.transaction.createMany({
      data: parsedTransactions.map((transaction) => ({
        ...transaction,
        accountId,
      })),
    }),
    prisma.lookupLogging.createMany({ data: lookupLogs }),
  ]);

  return { success: true };
};
