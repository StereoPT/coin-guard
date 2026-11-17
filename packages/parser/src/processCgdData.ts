import { TransactionType } from "@coin-guard/db";
import { buildTransaction, processRows } from "./transactions";
import type { ProcessedTransaction, RawCgdTransactionData } from "./types";

const processRow = (
  row: RawCgdTransactionData,
): ProcessedTransaction | null => {
  const credit = row.Crédito || "";
  const debit = row.Débito || "";

  return buildTransaction({
    description: row.Descrição,
    date: row["Data valor"],
    amount: credit || debit,
    balance: row["Saldo contabilístico"],
    dateFormat: "dd-MM-yyyy",
    type: credit ? TransactionType.CREDIT : TransactionType.DEBIT,
  });
};

export const processCgdTransactionData = (rawData: RawCgdTransactionData[]) =>
  processRows(rawData, processRow);
