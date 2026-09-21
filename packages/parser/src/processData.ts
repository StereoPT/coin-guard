import { TransactionType } from "@coin-guard/db";
import { format, isValid, parse } from "date-fns";
import type { ProcessedTransaction, RawTransactionData } from "./types";

const parseNumbers = (value: string) => {
  const cleanValue = value.replace(/\./g, "").replace(",", ".");

  const number = parseFloat(cleanValue);
  return Math.round(number * 100) / 100;
};

const parseDates = (dateString: string) => {
  if (!dateString || typeof dateString !== "string") return null;

  try {
    const parsedDate = parse(dateString, "dd-MM-yyyy", new Date());

    if (!isValid(parsedDate)) return null;

    return format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss'Z'");
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: error logging
    console.warn("Error parsing date:", dateString, error);
    return null;
  }
};

const processRow = (row: RawTransactionData): ProcessedTransaction | null => {
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

    const date = parseDates(dateString);
    if (!date) return null;

    return {
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

export const processTransactionData = (rawData: RawTransactionData[]) => {
  const processedTransactions = rawData
    .map(processRow)
    .filter((transaction) => transaction != null);

  return processedTransactions;
};
