import { parseCsv } from "../csv";
import { processTransactionData } from "../processData";
import type { BankParser } from "./types";

export const cgdParser: BankParser = async (buffer) => {
  const fileContents = buffer
    .toString("latin1")
    .replace(/\r\n/g, "\n")
    .split("\n")
    .slice(6, -2)
    .map((line) => line.replace(/;$/, ""))
    .join("\n");

  const rawData = await parseCsv(fileContents);

  const transactions = processTransactionData(rawData);

  if (transactions.length === 0) {
    throw new Error("No transactions found in the CGD file");
  }

  return transactions;
};
