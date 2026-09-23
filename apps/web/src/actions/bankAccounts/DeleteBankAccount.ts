"use server";

import {
  findFallbackDefaultAccount,
  promoteAccountOps,
} from "@/actions/bankAccounts/findFallbackDefaultAccount";
import { prisma } from "@coin-guard/db/server";

export const DeleteBankAccount = async (bankAccountId: string) => {
  const account = await prisma.bankAccount.findUniqueOrThrow({
    where: { id: bankAccountId },
    select: { isDefault: true },
  });

  if (!account.isDefault) {
    await prisma.bankAccount.delete({ where: { id: bankAccountId } });
    return;
  }

  const nextDefault = await findFallbackDefaultAccount(bankAccountId);

  await prisma.$transaction([
    prisma.bankAccount.delete({ where: { id: bankAccountId } }),
    ...promoteAccountOps(nextDefault),
  ]);
};
