"use server";

import { parseOrThrow } from "@/lib/parseOrThrow";
import {
  editBankAccountSchema,
  type editBankAccountSchemaType,
} from "@/schemas/bankAccounts";
import { prisma } from "@coin-guard/db/server";

export const EditBankAccount = async (
  bankAccountId: string,
  formValues: editBankAccountSchemaType,
) => {
  const data = await parseOrThrow(editBankAccountSchema, formValues);

  if (!data.isDefault) {
    await prisma.bankAccount.update({ where: { id: bankAccountId }, data });
    return;
  }

  await prisma.$transaction([
    prisma.bankAccount.updateMany({
      data: { isDefault: false },
      where: { id: { not: bankAccountId }, isDefault: true },
    }),
    prisma.bankAccount.update({ where: { id: bankAccountId }, data }),
  ]);
};
