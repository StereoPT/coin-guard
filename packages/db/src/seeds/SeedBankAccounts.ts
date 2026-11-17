/** biome-ignore-all lint/suspicious/noConsole: Required for Logging */

import { BankAccountFactory } from "../factories/bankAccounts";
import { prisma } from "../prisma";

const BANK_ACCOUNT_OVERRIDES = [
  {
    name: "Caixa Geral de Depósitos",
    alias: "CGD",
    isDefault: true,
  },
  {
    name: "Crédito Agrícola",
    alias: "CA",
    isDefault: false,
  },
];

export const CreateBankAccounts = async () => {
  console.log("🏦 Creating bank accounts...");

  const fakerBankAccounts = BankAccountFactory.createMany(
    BANK_ACCOUNT_OVERRIDES.length,
    BANK_ACCOUNT_OVERRIDES,
  );

  const bankAccounts = await prisma.bankAccount.createManyAndReturn({
    data: fakerBankAccounts,
    skipDuplicates: true,
  });

  console.log(
    `✅ Created ${bankAccounts.length} of ${fakerBankAccounts.length} bank accounts`,
  );
  console.log();

  return bankAccounts;
};
