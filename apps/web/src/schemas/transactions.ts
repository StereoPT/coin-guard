import { TransactionType } from "@coin-guard/db";
import { z } from "zod";

export const defaultTransactionValues = {
  date: undefined,
  description: "",
  type: undefined,
  amount: 0,
  balance: 0,
  note: "",
  categoryId: undefined,
  accountId: undefined,
};

export const addTransactionSchema = z.object({
  date: z.date(),
  description: z.string().trim().nonempty(),
  type: z.enum(TransactionType),
  amount: z.number(),
  balance: z.number(),
  note: z.string().trim().optional(),
  categoryId: z.string().trim().optional(),
  accountId: z.string().trim().nonempty(),
});

export const editTransactionSchema = addTransactionSchema.partial();

export type addTransactionSchemaType = z.infer<typeof addTransactionSchema>;
export type editTransactionSchemaType = z.infer<typeof editTransactionSchema>;
