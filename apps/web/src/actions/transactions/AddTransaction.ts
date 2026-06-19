"use server";

import { parseOrThrow } from "@/lib/parseOrThrow";
import {
  addTransactionSchema,
  type addTransactionSchemaType,
} from "@/schemas/transactions";
import { prisma } from "@coin-guard/db/server";

export const AddTransaction = async (formValues: addTransactionSchemaType) => {
  const data = await parseOrThrow(addTransactionSchema, formValues);

  await prisma.transaction.create({ data });
};
