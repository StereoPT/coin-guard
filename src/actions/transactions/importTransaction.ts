'use server';

import { importTransactionSchemaType } from '@/schemas/transactions';

export const ImportTransaction = async (
  formValues: importTransactionSchemaType,
) => {
  console.log('@@ Import Transaction', formValues);

  return true;
};
