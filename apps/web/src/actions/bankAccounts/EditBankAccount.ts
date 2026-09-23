"use server";

import {
  findFallbackDefaultAccount,
  promoteAccountOps,
} from "@/actions/bankAccounts/findFallbackDefaultAccount";
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

  if (data.isDefault) {
    await prisma.$transaction([
      prisma.bankAccount.updateMany({
        data: { isDefault: false },
        where: { id: { not: bankAccountId }, isDefault: true },
      }),
      prisma.bankAccount.update({ where: { id: bankAccountId }, data }),
    ]);
    return;
  }

  if (data.isDefault === undefined) {
    await prisma.bankAccount.update({ where: { id: bankAccountId }, data });
    return;
  }

  const current = await prisma.bankAccount.findUniqueOrThrow({
    where: { id: bankAccountId },
    select: { isDefault: true },
  });

  if (!current.isDefault) {
    await prisma.bankAccount.update({ where: { id: bankAccountId }, data });
    return;
  }

  const nextDefault = await findFallbackDefaultAccount(bankAccountId);

  await prisma.$transaction([
    prisma.bankAccount.update({
      where: { id: bankAccountId },
      data: nextDefault ? data : { ...data, isDefault: true },
    }),
    ...promoteAccountOps(nextDefault),
  ]);
};
