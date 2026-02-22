"use server";

import { TransformCategories } from "@/actions/etl/transformCategories";
import { format, isValid, parse } from "date-fns";
import Papa from "papaparse";

type RawTransactionData = {
  "Data mov.": string;
  "Data valor": string;
  Descrição: string;
  Débito: string;
  Crédito: string;
  "Saldo contabilístico": string;
  "Saldo disponível": string;
  Categoria: string;
  [key: string]: string | undefined;
};

export type ProcessedTransaction = {
  date: string;
  description: string;
  amount: number;
  balance: number;
  type: "CREDIT" | "DEBIT";
  categoryId?: string;
};

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
    console.warn("Error parsing date:", dateString, error);
    return null;
  }
};

const processRow = (row: RawTransactionData): ProcessedTransaction | null => {
  try {
    const description = row["Descrição"]?.trim().toLowerCase() || "";
    if (!description) return null;

    const creditValue = row["Crédito"] || "";
    const debitValue = row["Débito"] || "";
    const amountString = creditValue || debitValue;

    if (!amountString) return null;

    const type: "CREDIT" | "DEBIT" = creditValue ? "CREDIT" : "DEBIT";

    const amount = parseNumbers(amountString);
    if (isNaN(amount)) return null;

    // Process balance
    const balanceString = row["Saldo contabilístico"] || "";
    if (!balanceString) return null;

    const balance = parseNumbers(balanceString);
    if (isNaN(balance)) return null;

    // Process date
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
    console.warn("Error processing row:", error);
    return null;
  }
};

const processData = (rawData: RawTransactionData[]): ProcessedTransaction[] => {
  const dataWithoutLastLine =
    rawData.length > 0 ? rawData.slice(0, -1) : rawData;

  const processedTransactions = dataWithoutLastLine
    .map(processRow)
    .filter((transaction) => transaction !== null);

  return processedTransactions;
};

const parseCSV = (csvContent: string): Promise<RawTransactionData[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(csvContent, {
      header: true,
      delimiter: ";",
      skipEmptyLines: true,
      transformHeader: (header: string) => header.trim(),
      complete: (results) => {
        if (results.errors.length > 0) {
          reject(
            new Error(
              `CSV Parsing Errors: ${results.errors
                .map((e) => e.message)
                .join(", ")}`,
            ),
          );
        } else {
          resolve(results.data as RawTransactionData[]);
        }
      },
      error: (error: Error) => {
        reject(new Error(`CSV parsing failed: ${error.message}`));
      },
    });
  });
};

export const ParseTransaction = async (formValues: FormData) => {
  try {
    const file = formValues.get("file") as File;
    if (!file) {
      throw new Error("No file uploaded!");
    }

    if (file.size > 5000000) {
      throw new Error("File size must be less than 5MB");
    }

    if (file.type !== "text/csv" || !file.name.toLowerCase().endsWith(".csv")) {
      throw new Error("Only CSV files are allowed");
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileContents = buffer
      .toString("latin1")
      .split("\n")
      .slice(6)
      .join("\n");

    const rawData = await parseCSV(fileContents);
    const processedData = processData(rawData);

    // ***** ***** ***** ETL Process ***** ***** ***** //

    const enhancedTransactions = await TransformCategories(processedData);

    // ***** ***** ***** ETL Process ***** ***** ***** //

    return enhancedTransactions;
  } catch (error) {
    console.error("Failed to process CSV file:", error);
    throw new Error("Failed to process CSV file!");
  }
};
