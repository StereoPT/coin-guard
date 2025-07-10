'use server';

import prisma from '@/lib/prisma';
import {
  editTransactionSchema,
  editTransactionSchemaType,
} from '@/schemas/transactions';

export const EditTransaction = async (
  transactionId: string,
  formValues: editTransactionSchemaType,
) => {
  const { success, data } = await editTransactionSchema.safeParseAsync(
    formValues,
  );
  if (!success) {
    throw new Error('Invalid Form Data');
  }

  const result = await prisma.transaction.update({
    where: { id: transactionId },
    data,
  });
  if (!result) {
    throw new Error('Failed to Add Transaction');
  }
};
