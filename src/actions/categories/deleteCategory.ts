"use server";

import { prisma } from "@/lib/prisma";

export const DeleteCategory = async (id: string) => {
  const result = await prisma.category.delete({ where: { id } });
  if (!result) {
    throw new Error("Failed to Delete Category");
  }
};
