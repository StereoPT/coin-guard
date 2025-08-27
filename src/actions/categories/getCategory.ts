"use server";

import prisma from "@/lib/prisma";

export const GetCategory = async (id: string) => {
  const category = await prisma.category.findUnique({
    where: { id },
    include: { transactions: { orderBy: { date: "asc" } } },
  });

  return category;
};
