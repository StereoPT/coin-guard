"use server";

import { prisma } from "@coin-guard/db/server";

export const DeleteLookupCategory = async (lookupCategoryId: string) => {
  const result = await prisma.lookupCategory.delete({
    where: { id: lookupCategoryId },
  });

  if (!result) {
    throw new Error("Failed to Delete Lookup Category");
  }
};
