"use server";

import { prisma } from "@/lib/prisma";

export const DeleteLookupCategory = async (id: string) => {
  const result = await prisma.lookup_Category.delete({
    where: { id },
  });
  if (!result) {
    throw new Error("Failed to Delete Lookup Category");
  }
};
