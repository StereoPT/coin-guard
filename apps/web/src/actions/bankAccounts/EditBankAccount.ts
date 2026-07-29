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

  await prisma.bankAccount.update({
    where: { id: bankAccountId },
    data,
  });
};
