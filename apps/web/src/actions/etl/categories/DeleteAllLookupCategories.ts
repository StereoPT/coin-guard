"use server";

import { prisma } from "@coin-guard/db/server";

export const DeleteAllLookupCategories = async (categoryId: string) => {
  await prisma.lookupCategory.deleteMany({
    where: { categoryId },
  });
};
