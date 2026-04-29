"use server";

import { prisma } from "@/lib/prisma";

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
  });

  return categoriesWithLookups;
};
