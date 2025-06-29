import { z } from 'zod';

export const addTransactionSchema = z.object({
  date: z.date(),
  description: z.string().trim(),
  type: z.enum(['CREDIT', 'DEBIT']),
  amount: z.coerce.number(),
  balance: z.coerce.number(),
});

export type addTransactionSchemaType = z.infer<typeof addTransactionSchema>;
