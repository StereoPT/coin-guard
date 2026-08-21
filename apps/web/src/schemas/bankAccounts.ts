import { BankAccountType } from "@coin-guard/db";
import { z } from "zod";

export const addBankAccountSchema = z.object({
  name: z.string().trim().nonempty(),
  alias: z.string().trim().optional(),
  type: z.enum(BankAccountType),
  iban: z.string().trim().nonempty(),
  isDefault: z.boolean(),
});

export const editBankAccountSchema = addBankAccountSchema.partial();

export type addBankAccountSchemaType = z.infer<typeof addBankAccountSchema>;
export type editBankAccountSchemaType = z.infer<typeof editBankAccountSchema>;
