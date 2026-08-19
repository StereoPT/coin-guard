"use server";

import { prisma } from "@coin-guard/db/server";

export const GetLookupCategories = async () => {
  const categoriesWithLookups = await prisma.category.findMany({
    where: {
      lookups: {
        some: {},
      },
    },
    include: {
      lookups: true,
    },
    orderBy: { name: "asc" },
  });

  return categoriesWithLookups;
};
