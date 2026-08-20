"use server";

import { prisma } from "@coin-guard/db/server";

export const GetCategory = async (categoryId: string) => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    throw new Error(`Category with ID ${categoryId} not found`);
  }

  return category;
};
