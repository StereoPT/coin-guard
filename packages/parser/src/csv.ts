import Papa from "papaparse";
import type { RawCgdTransactionData } from "./types";

export const parseCsv = (csv: string): Promise<RawCgdTransactionData[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(csv, {
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
          resolve(results.data as RawCgdTransactionData[]);
        }
      },
      error: (error: Error) => {
        reject(new Error(`CSV parsing failed: ${error.message}`));
      },
    });
  });
};
