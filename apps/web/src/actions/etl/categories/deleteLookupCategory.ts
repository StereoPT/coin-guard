"use server";

import { prisma } from "@/lib/prisma";

export const DeleteLookupCategory = async (lookupCategoryId: string) => {
  const result = await prisma.lookupCategory.delete({
    where: { id: lookupCategoryId },
  });

  if (!result) {
    throw new Error("Failed to Delete Lookup Category");
  }
};
