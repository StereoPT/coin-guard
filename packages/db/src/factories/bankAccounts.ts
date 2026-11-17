import { faker } from "@faker-js/faker";
import { type BankAccount, BankAccountType } from "../generated/prisma/client";
import { buildFactory } from "../utils/buildFactory";

type FactoryBankAccount = Omit<BankAccount, "id" | "createdAt" | "updatedAt">;

const BANKS = [
  { alias: "CGD", name: "Caixa Geral de Depósitos" },
  { alias: "CA", name: "Crédito Agrícola" },
] as const;

export const BankAccountFactory = buildFactory<FactoryBankAccount>(() => {
  const bank = faker.helpers.arrayElement(BANKS);

  return {
    name: bank.name,
    alias: bank.alias,
    type: faker.helpers.enumValue(BankAccountType),
    iban: faker.finance.iban({ countryCode: "PT" }),
    isDefault: false,
  };
});
