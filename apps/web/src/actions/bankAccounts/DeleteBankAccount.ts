"use server";

import { prisma } from "@coin-guard/db/server";

export const DeleteBankAccount = async (bankAccountId: string) => {
  await prisma.bankAccount.delete({ where: { id: bankAccountId } });
};
