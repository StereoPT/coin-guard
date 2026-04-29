"use server";

import type { ProcessedTransaction } from "@/actions/transactions/parseTransaction";
import { LoggingType, LookupField } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

type CategoryMap = {
  categoryId: string;
  categoryName: string;
};

export const TransformCategories = async (
  processedTransactions: ProcessedTransaction[],
) => {
  const descriptionToCategoryMap = new Map<string, CategoryMap>();

  const categoryLookups = await prisma.lookupCategory.findMany({
    where: {
      enabled: true,
    },
    select: {
      description: true,
      categoryId: true,
      category: {
        select: { name: true },
      },
    },
  });

  for (const lookup of categoryLookups) {
    descriptionToCategoryMap.set(lookup.description, {
      categoryId: lookup.categoryId,
      categoryName: lookup.category.name,
    });
  }

  const enhancedTransactions = processedTransactions.map((transaction) => {
    const category = descriptionToCategoryMap.get(transaction.description);

    return {
      ...transaction,
      categoryId: category?.categoryId,
    };
  });

  await prisma.lookupLogging.createMany({
    data: enhancedTransactions.map((transaction) => {
      const categoryName = descriptionToCategoryMap.get(
        transaction.description,
      )?.categoryName;

      return {
        type: transaction.categoryId ? LoggingType.INFO : LoggingType.ERROR,
        lookupField: LookupField.CATEGORY,
        description: transaction.categoryId
          ? `Matched '${transaction.description}' → ${categoryName}`
          : `No match for '${transaction.description}'`,
      };
    }),
  });

  return enhancedTransactions;
};
