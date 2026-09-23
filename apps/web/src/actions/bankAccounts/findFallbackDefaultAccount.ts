import type { BankAccount, Prisma } from "@coin-guard/db";
import { prisma } from "@coin-guard/db/server";

export const findFallbackDefaultAccount = async (excludeId: string) => {
  const account = await prisma.bankAccount.findFirst({
    where: { id: { not: excludeId } },
    orderBy: { createdAt: "asc" },
  });

  return account;
};

export const promoteAccountOps = (
  account: { id: string } | null,
): Prisma.PrismaPromise<BankAccount>[] => {
  return account
    ? [
        prisma.bankAccount.update({
          where: { id: account.id },
          data: { isDefault: true },
        }),
      ]
    : [];
};
