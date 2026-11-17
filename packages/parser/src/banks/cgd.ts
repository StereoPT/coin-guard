import { parseCsv } from "../csv";
import { processCgdTransactionData } from "../processCgdData";
import { assertTransactions } from "../transactions";
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

  return assertTransactions(processCgdTransactionData(rawData), "CGD");
};
