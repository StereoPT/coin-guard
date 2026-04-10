"use server";

import { prisma } from "@/lib/prisma";

export const DeleteAllLookupCategories = async (id: string) => {
  const result = await prisma.lookupCategory.deleteMany({
    where: { categoryId: id },
  });
  if (!result) {
    throw new Error("Failed to Delete All Lookup Categories");
  }
};
