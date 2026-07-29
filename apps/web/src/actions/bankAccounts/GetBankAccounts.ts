"use server";

import { prisma } from "@coin-guard/db/server";

export const GetBankAccounts = async () => {
  const bankAccounts = await prisma.bankAccount.findMany();

  return bankAccounts;
};
