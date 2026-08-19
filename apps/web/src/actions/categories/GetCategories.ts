"use server";

import { prisma } from "@coin-guard/db/server";

export const GetCategories = async () => {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return categories;
};
