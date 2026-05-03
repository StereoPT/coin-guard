"use server";

import {
  addTransactionSchema,
  type addTransactionSchemaType,
} from "@/schemas/transactions";
import { prisma } from "@coin-guard/db/server";

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
