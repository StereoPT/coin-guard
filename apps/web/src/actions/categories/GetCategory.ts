"use server";

import { prisma } from "@coin-guard/db/server";

export const GetCategory = async (categoryId: string) => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  const transactions = await prisma.transaction.findMany({
    where: { categoryId },
    orderBy: { date: "asc" },
    include: { category: true },
  });

  return { ...category, transactions };
};
