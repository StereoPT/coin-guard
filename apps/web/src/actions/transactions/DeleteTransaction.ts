"use server";

import { prisma } from "@coin-guard/db/server";

export const DeleteTransaction = async (transactionId: string) => {
  await prisma.transaction.delete({
    where: { id: transactionId },
  });
};
