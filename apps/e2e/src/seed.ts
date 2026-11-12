import { randomUUID } from "node:crypto";
import { assertSafeDatabaseUrl } from "./guard";
import type { SeedBankAccount, SeedTransaction } from "./types/seed";

async function getPrisma() {
  const { url } = assertSafeDatabaseUrl(process.env.E2E_DATABASE_URL);
  process.env.DATABASE_URL = url;

  const { prisma } = await import("@coin-guard/db/server");

  return prisma;
}

export async function createBankAccount(account: SeedBankAccount = {}) {
  const prisma = await getPrisma();

  const { id } = await prisma.bankAccount.create({
    data: {
      name: account.name ?? "Main Account",
      alias: account.alias === undefined ? "Main" : account.alias,
      type: account.type ?? "CHECKING",
      iban: `PT50${randomUUID().replace(/-/g, "").slice(0, 21)}`,
      isDefault: account.isDefault ?? true,
    },
  });

  return id;
}

export async function createCategory(name: string) {
  const prisma = await getPrisma();

  const { id } = await prisma.category.create({ data: { name } });

  return id;
}

export async function createTransaction(transaction: SeedTransaction) {
  const prisma = await getPrisma();

  const { id } = await prisma.transaction.create({
    data: {
      accountId: transaction.accountId,
      description: transaction.description,
      type: transaction.type ?? "DEBIT",
      amount: transaction.amount ?? 10,
      balance: transaction.balance ?? 1000,
      date: transaction.date ?? new Date(),
      categoryId: transaction.categoryId ?? null,
      note: transaction.note ?? null,
    },
  });

  return id;
}

export async function countTransactions(description?: string) {
  const prisma = await getPrisma();

  return prisma.transaction.count({
    where: description ? { description } : undefined,
  });
}

export async function getTransaction(description: string) {
  const prisma = await getPrisma();
  return prisma.transaction.findFirst({
    where: { description },
    include: { category: true },
  });
}
