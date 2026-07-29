import { BankAccountType } from "@coin-guard/db";
import { z } from "zod";

export const addBankAccountSchema = z.object({
  name: z.string().trim().nonempty(),
  type: z.enum(BankAccountType),
  iban: z.string().trim().nonempty(),
});

export const editBankAccountSchema = addBankAccountSchema.partial();

export type addBankAccountSchemaType = z.infer<typeof addBankAccountSchema>;
export type editBankAccountSchemaType = z.infer<typeof editBankAccountSchema>;
