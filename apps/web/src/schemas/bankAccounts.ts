import { BankAccountType } from "@coin-guard/db";
import { z } from "zod";

export const defaultBankAccountValues = {
  name: "",
  alias: "",
  type: undefined,
  iban: "",
  isDefault: false,
};

export const addBankAccountSchema = z.object({
  name: z.string().trim().nonempty(),
  alias: z.string().trim().optional(),
  type: z.enum(BankAccountType),
  iban: z
    .string()
    .trim()
    .transform((value) => value.replace(/\s+/g, "").toUpperCase())
    .pipe(z.string().regex(/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/, "Invalid IBAN")),
  isDefault: z.boolean(),
});

export const editBankAccountSchema = addBankAccountSchema.partial();

export type addBankAccountSchemaType = z.infer<typeof addBankAccountSchema>;
export type editBankAccountSchemaType = z.infer<typeof editBankAccountSchema>;
