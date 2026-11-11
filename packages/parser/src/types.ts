import type { TransactionType } from "@coin-guard/db";

export type RawTransactionData = {
  "Data mov.": string;
  "Data valor": string;
  Descrição: string;
  Débito: string;
  Crédito: string;
  "Saldo contabilístico": string;
  "Saldo disponível": string;
  Categoria: string;
};

export type ProcessedTransaction = {
  id: string;
  date: Date;
  description: string;
  amount: number;
  balance: number;
  type: TransactionType;
  categoryId?: string;
  accountId?: string;

  descriptionMatched?: boolean;
  categoryMatched?: boolean;
};
