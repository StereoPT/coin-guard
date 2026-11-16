import { TransactionType } from "@coin-guard/db";
import crypto from "node:crypto";
import type { ProcessedTransaction, RawCgdTransactionData } from "./types";
import { parseDates, parseNumbers } from "./utils";

const processRow = (
  row: RawCgdTransactionData,
): ProcessedTransaction | null => {
  try {
    const description =
      row.Descrição?.trim().toLowerCase().replace(/\s+/g, " ") || "";
    if (!description) return null;

    const creditValue = row.Crédito || "";
    const debitValue = row.Débito || "";
    const amountString = creditValue || debitValue;
    if (!amountString) return null;

    const amount = parseNumbers(amountString);
    if (Number.isNaN(amount)) return null;

    const type: TransactionType = creditValue
      ? TransactionType.CREDIT
      : TransactionType.DEBIT;

    const balanceString = row["Saldo contabilístico"] || "";
    if (!balanceString) return null;

    const balance = parseNumbers(balanceString);
    if (Number.isNaN(balance)) return null;

    const dateString = row["Data valor"];
    if (!dateString) return null;

    const date = parseDates(dateString, "dd-MM-yyyy");
    if (!date) return null;

    return {
      id: crypto.randomUUID(),
      date,
      description,
      amount,
      balance,
      type,
    };
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: error logging
    console.warn("Error processing row:", error);
    return null;
  }
};

export const processTransactionData = (rawData: RawCgdTransactionData[]) => {
  const processedTransactions = rawData
    .map(processRow)
    .filter((transaction) => transaction != null);

  return processedTransactions;
};
