import { readSheet } from "read-excel-file/node";
import { processCaTransactionData } from "../processCaData";
import type { RawCaTransactionData } from "../types";
import { assertTransactions } from "../transactions";
import { rowsToObjects } from "../xlsx";
import type { BankParser } from "./types";

export const caParser: BankParser = async (buffer) => {
  const sheet = await readSheet(buffer);

  const rawData = rowsToObjects<RawCaTransactionData>(sheet.slice(4, -3));

  return assertTransactions(processCaTransactionData(rawData), "CA");
};
