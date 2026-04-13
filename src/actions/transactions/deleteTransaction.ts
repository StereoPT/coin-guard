"use server";

import { prisma } from "@/lib/prisma";

export const DeleteTransaction = async (transactionId: string) => {
  const result = await prisma.transaction.delete({
    where: { id: transactionId },
  });

  if (!result) {
    throw new Error("Failed to Delete Transaction");
  }
};
