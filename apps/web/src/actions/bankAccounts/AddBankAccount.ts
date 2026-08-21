"use server";

import { parseOrThrow } from "@/lib/parseOrThrow";
import {
  addBankAccountSchema,
  type addBankAccountSchemaType,
} from "@/schemas/bankAccounts";
import { prisma } from "@coin-guard/db/server";

export const AddBankAccount = async (formValues: addBankAccountSchemaType) => {
  const data = await parseOrThrow(addBankAccountSchema, formValues);

  const bankAccountsCount = await prisma.bankAccount.count();
  const isDefault = data.isDefault || bankAccountsCount === 0;

  if (!isDefault) {
    await prisma.bankAccount.create({ data });
    return;
  }

  await prisma.$transaction([
    prisma.bankAccount.updateMany({
      data: { isDefault: false },
      where: { isDefault: true },
    }),
    prisma.bankAccount.create({ data: { ...data, isDefault: true } }),
  ]);
};
