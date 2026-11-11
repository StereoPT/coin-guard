"use server";

import { prisma } from "@coin-guard/db/server";
import type { ProcessedTransaction } from "@coin-guard/parser";

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
      descriptionMatched: Boolean(newDescription),
    }),
  );

  return enhancedTransactions;
};
