"use server";

import { prisma } from "@/lib/prisma";

export const DeleteTransaction = async (id: string) => {
  const result = await prisma.transaction.delete({ where: { id } });
  if (!result) {
    throw new Error("Failed to Delete Transaction");
  }
};
