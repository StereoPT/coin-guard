"use server";

import { parseOrThrow } from "@/lib/parseOrThrow";
import {
  editTransactionSchema,
  type editTransactionSchemaType,
} from "@/schemas/transactions";
import { prisma } from "@coin-guard/db/server";

export const EditTransaction = async (
  transactionId: string,
  formValues: editTransactionSchemaType,
) => {
  const data = await parseOrThrow(editTransactionSchema, formValues);

  await prisma.transaction.update({
    where: { id: transactionId },
    data,
  });
};
