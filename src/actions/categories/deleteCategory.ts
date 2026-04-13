"use server";

import { prisma } from "@/lib/prisma";

export const DeleteCategory = async (categoryId: string) => {
  const result = await prisma.category.delete({ where: { id: categoryId } });

  if (!result) {
    throw new Error("Failed to Delete Category");
  }
};
