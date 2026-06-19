import { z } from "zod";

export const addTransactionSchema = z.object({
  date: z.date(),
  description: z.string().trim().nonempty(),
  type: z.enum(["CREDIT", "DEBIT"]),
  amount: z.number(),
  balance: z.number(),
  note: z.string().trim().optional(),
  categoryId: z.string().trim().optional(),
});

export const editTransactionSchema = addTransactionSchema.partial();

export type addTransactionSchemaType = z.infer<typeof addTransactionSchema>;
export type editTransactionSchemaType = z.infer<typeof editTransactionSchema>;
