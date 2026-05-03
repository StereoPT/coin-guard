"use server";

import { prisma } from "@coin-guard/db/server";

export const DeleteCategory = async (categoryId: string) => {
  const result = await prisma.category.delete({ where: { id: categoryId } });

  if (!result) {
    throw new Error("Failed to Delete Category");
  }
};
