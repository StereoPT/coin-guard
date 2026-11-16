import { readSheet } from "read-excel-file/node";
import { processCaTransactionData } from "../processCaData";
import type { RawCaTransactionData } from "../types";
import { rowsToObjects } from "../xlsx";
import type { BankParser } from "./types";

export const caParser: BankParser = async (buffer) => {
  const sheet = await readSheet(buffer);

  const rawData = rowsToObjects<RawCaTransactionData>(sheet.slice(4, -3));

  const transactions = processCaTransactionData(rawData);

  if (transactions.length === 0) {
    throw new Error("No transactions found in the CA file");
  }

  return transactions;
};
