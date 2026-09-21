"use server";

import { prisma } from "@coin-guard/db/server";

export const GetLookupCategories = async () => {
  const lookupCategories = await prisma.lookupCategory.findMany({
    include: {
      category: { select: { name: true } },
    },
    orderBy: [{ category: { name: "asc" } }, { description: "asc" }],
  });

  return lookupCategories.map(({ category, ...lookupCategory }) => ({
    ...lookupCategory,
    categoryName: category.name,
  }));
};
