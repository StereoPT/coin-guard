"use server";

import type { ProcessedTransaction } from "@/actions/transactions/ParseTransaction";
import { LoggingType, LookupField } from "@coin-guard/db";
import { prisma } from "@coin-guard/db/server";

export const TransformDescriptions = async (
  processedTransactions: ProcessedTransaction[],
) => {
  const descriptionToNewDescriptionMap = new Map<string, string>();

  const descriptionLookups = await prisma.lookupDescription.findMany({
    where: {
      enabled: true,
    },
    select: {
      description: true,
      newDescription: true,
    },
  });

  for (const lookup of descriptionLookups) {
    descriptionToNewDescriptionMap.set(
      lookup.description,
      lookup.newDescription,
    );
  }

  const matches = processedTransactions.map((transaction) => ({
    transaction,
    newDescription: descriptionToNewDescriptionMap.get(transaction.description),
  }));

  const enhancedTransactions = matches.map(
    ({ transaction, newDescription }) => ({
      ...transaction,
      description: newDescription || transaction.description,
    }),
  );

  await prisma.lookupLogging.createMany({
    data: matches.map(({ transaction, newDescription }) => ({
      type: newDescription ? LoggingType.INFO : LoggingType.ERROR,
      lookupField: LookupField.DESCRIPTION,
      description: newDescription
        ? `Matched '${transaction.description}' → '${newDescription}'`
        : `No match for '${transaction.description}'`,
    })),
  });

  return enhancedTransactions;
};
