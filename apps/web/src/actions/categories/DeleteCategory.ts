"use server";

import { prisma } from "@coin-guard/db/server";

export const DeleteCategory = async (categoryId: string) => {
  await prisma.category.delete({ where: { id: categoryId } });
};
