"use server";

import { prisma } from "@/lib/prisma";

export const GetCategory = async (categoryId: string) => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    include: { transactions: { orderBy: { date: "asc" } } },
  });

  return category;
};
