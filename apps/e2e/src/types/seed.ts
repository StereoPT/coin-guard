import type { TransactionType } from "@coin-guard/db";

export type SeedBankAccount = {
  name?: string;
  alias?: string | null;
  type?: "CHECKING" | "SAVINGS";
  isDefault?: boolean;
};

export type SeedTransaction = {
  accountId: string;
  description: string;
  type?: TransactionType;
  amount?: number;
  balance?: number;
  date?: Date;
  categoryId?: string | null;
  note?: string | null;
};
