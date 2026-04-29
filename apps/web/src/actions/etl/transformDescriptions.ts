"use server";

import type { ProcessedTransaction } from "@/actions/transactions/parseTransaction";
import { LoggingType, LookupField } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

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

  const enhancedTransactions = processedTransactions.map((transaction) => {
    const newDescription = descriptionToNewDescriptionMap.get(
      transaction.description,
    );

    return {
      ...transaction,
      description: newDescription || transaction.description,
    };
  });

  await prisma.lookupLogging.createMany({
    data: enhancedTransactions.map((transaction) => {
      const newDescription = descriptionToNewDescriptionMap.get(
        transaction.description,
      );

      return {
        type: newDescription ? LoggingType.INFO : LoggingType.ERROR,
        lookupField: LookupField.DESCRIPTION,
        description: newDescription
          ? `Matched '${transaction.description}' → '${newDescription}'`
          : `No match for '${transaction.description}'`,
      };
    }),
  });

  return enhancedTransactions;
};
