import { z } from 'zod';

export const addTransactionSchema = z.object({
  date: z.date(),
  description: z.string().trim().nonempty(),
  type: z.enum(['CREDIT', 'DEBIT']),
  amount: z.coerce.number(),
  balance: z.coerce.number(),
});

export const importTransactionsSchema = z.object({
  file:
    typeof window === 'undefined'
      ? z.any()
      : z
          .instanceof(FileList)
          .refine((files) => files?.length > 0, 'File is required')
          .refine(
            (files) => files?.[0]?.size <= 5000000,
            'File size must be less than 5MB',
          )
          .refine(
            (files) =>
              files?.[0]?.type === 'text/csv' ||
              files?.[0]?.name.toLowerCase().endsWith('.csv'),
            'Only CSV files are allowed',
          ),
});

export type addTransactionSchemaType = z.infer<typeof addTransactionSchema>;
export type importTransactionSchemaType = z.infer<
  typeof importTransactionsSchema
>;
export const addTransactionToastID = 'add-transaction';
export const importTransactionToastID = 'import-transaction';
