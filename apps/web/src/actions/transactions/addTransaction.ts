"use server";

import { prisma } from "@/lib/prisma";
import {
  addTransactionSchema,
  type addTransactionSchemaType,
} from "@/schemas/transactions";

export const AddTransaction = async (formValues: addTransactionSchemaType) => {
  const { success, data } =
    await addTransactionSchema.safeParseAsync(formValues);
  if (!success) {
    throw new Error("Invalid Form Data");
  }

  const result = await prisma.transaction.create({ data });
  if (!result) {
    throw new Error("Failed to Add Transaction");
  }
};
