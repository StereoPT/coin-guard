"use server";

import { prisma } from "@coin-guard/db/server";
import type { ProcessedTransaction } from "@coin-guard/parser";

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
      categoryMatched: category !== undefined,
    };
  });

  return enhancedTransactions;
};
