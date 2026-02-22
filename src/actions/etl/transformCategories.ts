"use server";

import type { ProcessedTransaction } from "@/actions/transactions/parseTransaction";
import { prisma } from "@/lib/prisma";

export const TransformCategories = async (
  processedTransactions: ProcessedTransaction[],
) => {
  const descriptionToCategoryMap = new Map<string, string>();

  const categoryLookups = await prisma.lookup_Category.findMany({
    where: {
      enabled: true,
    },
    select: {
      description: true,
      categoryId: true,
    },
  });

  for (const lookup of categoryLookups) {
    descriptionToCategoryMap.set(lookup.description, lookup.categoryId);
  }

  const enhancedTransactions = processedTransactions.map((transaction) => {
    const categoryId = descriptionToCategoryMap.get(transaction.description);

    return {
      ...transaction,
      categoryId: categoryId || undefined,
    };
  });

  return enhancedTransactions;
};
