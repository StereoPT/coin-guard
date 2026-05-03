"use server";

import { prisma } from "@coin-guard/db/server";

export const DeleteAllLookupCategories = async (categoryId: string) => {
  const result = await prisma.lookupCategory.deleteMany({
    where: { categoryId },
  });

  if (!result) {
    throw new Error("Failed to Delete All Lookup Categories");
  }
};
