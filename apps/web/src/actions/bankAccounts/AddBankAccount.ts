"use server";

import { parseOrThrow } from "@/lib/parseOrThrow";
import {
  addBankAccountSchema,
  type addBankAccountSchemaType,
} from "@/schemas/bankAccounts";
import { prisma } from "@coin-guard/db/server";

export const AddBankAccount = async (formValues: addBankAccountSchemaType) => {
  const data = await parseOrThrow(addBankAccountSchema, formValues);

  await prisma.bankAccount.create({ data });
};
