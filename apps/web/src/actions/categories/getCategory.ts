"use server";

import { prisma } from "@coin-guard/db/server";

export const GetCategory = async (categoryId: string) => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    include: { transactions: { orderBy: { date: "asc" } } },
  });

  return category;
};
