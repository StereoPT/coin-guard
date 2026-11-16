import { TransactionType } from "@coin-guard/db";
import crypto from "node:crypto";
import type { ProcessedTransaction, RawCaTransactionData } from "./types";
import { parseDates, parseNumbers } from "./utils";

const processRow = (row: RawCaTransactionData): ProcessedTransaction | null => {
  const description = row.Descrição?.toLowerCase().replace(/\s+/g, " ") || "";
  if (!description) return null;

  const amountString = row.Valor;
  if (!amountString) return null;

  const signedAmount = parseNumbers(amountString);
  if (Number.isNaN(signedAmount)) return null;

  const balanceString = row["Saldo após movimento"];
  if (!balanceString) return null;

  const balance = parseNumbers(balanceString);
  if (Number.isNaN(balance)) return null;

  const dateString = row["Data Valor"];
  if (!dateString) return null;

  const date = parseDates(dateString, "dd/MM/yyyy");
  if (!date) return null;

  return {
    id: crypto.randomUUID(),
    date,
    description,
    amount: Math.abs(signedAmount),
    balance,
    type: signedAmount < 0 ? TransactionType.DEBIT : TransactionType.CREDIT,
  };
};

export const processCaTransactionData = (rawData: RawCaTransactionData[]) =>
  rawData.map(processRow).filter((transaction) => transaction != null);
