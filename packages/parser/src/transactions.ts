import { TransactionType } from "@coin-guard/db";
import crypto from "node:crypto";
import type { ProcessedTransaction } from "./types";
import { parseDates, parseNumbers } from "./utils";

const normalizeDescription = (description: string) =>
  description.trim().toLowerCase().replace(/\s+/g, " ");

type BuildTransactionInput = {
  // Raw values as read from the bank file
  description?: string;
  date?: string;
  amount?: string;
  balance?: string;
  dateFormat: string;
  // Defaults to the sign of the amount when the bank has a single signed column
  type?: TransactionType;
};

// Validates and converts one raw row. Returns null for rows that are not
// transactions (blank lines, summaries, malformed values).
export const buildTransaction = ({
  description,
  date,
  amount,
  balance,
  dateFormat,
  type,
}: BuildTransactionInput): ProcessedTransaction | null => {
  const normalizedDescription = normalizeDescription(description ?? "");

  if (!normalizedDescription || !date || !amount || !balance) return null;

  const parsedDate = parseDates(date, dateFormat);
  const parsedAmount = parseNumbers(amount);
  const parsedBalance = parseNumbers(balance);

  if (!parsedDate) return null;
  if (Number.isNaN(parsedAmount) || Number.isNaN(parsedBalance)) return null;

  return {
    id: crypto.randomUUID(),
    date: parsedDate,
    description: normalizedDescription,
    amount: Math.abs(parsedAmount),
    balance: parsedBalance,
    type:
      type ??
      (parsedAmount < 0 ? TransactionType.DEBIT : TransactionType.CREDIT),
  };
};

export const processRows = <Raw>(
  rawData: Raw[],
  processRow: (row: Raw) => ProcessedTransaction | null,
) => rawData.map(processRow).filter((transaction) => transaction != null);

export const assertTransactions = (
  transactions: ProcessedTransaction[],
  bankName: string,
) => {
  if (transactions.length === 0) {
    throw new Error(`No transactions found in the ${bankName} file`);
  }

  return transactions;
};
