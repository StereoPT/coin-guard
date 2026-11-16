import { buildTransaction, processRows } from "./transactions";
import type { ProcessedTransaction, RawCaTransactionData } from "./types";

const processRow = (row: RawCaTransactionData): ProcessedTransaction | null =>
  buildTransaction({
    description: row.Descrição,
    date: row["Data Valor"],
    amount: row.Valor,
    balance: row["Saldo após movimento"],
    dateFormat: "dd/MM/yyyy",
  });

export const processCaTransactionData = (rawData: RawCaTransactionData[]) =>
  processRows(rawData, processRow);
