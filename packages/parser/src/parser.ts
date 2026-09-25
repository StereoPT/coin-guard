import { CSV_EXTENSION, CSV_TYPE, FIVE_MEGABYTES } from "./constants";
import { parseCsv } from "./csv";
import { processTransactionData } from "./processData";

export const ParseTransactionFile = async (file: File) => {
  try {
    if (!file) {
      throw new Error("No file uploaded!");
    }

    if (file.size > FIVE_MEGABYTES) {
      throw new Error("File size must be less than 5MB");
    }

    if (
      file.type !== CSV_TYPE ||
      !file.name.toLowerCase().endsWith(CSV_EXTENSION)
    ) {
      throw new Error("Only CSV files are allowed");
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // TODO: This works for CGD
    // Need a system for other banks
    const fileContents = buffer
      .toString("latin1")
      .replace(/\r\n/g, "\n")
      .split("\n")
      .slice(6, -2)
      .map((line) => line.replace(/;$/, ""))
      .join("\n");

    const rawData = await parseCsv(fileContents);
    const processedData = processTransactionData(rawData);

    return processedData;
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: error logging
    console.error("Failed to process CSV file:", error);
    throw error instanceof Error
      ? error
      : new Error("Failed to process CSV file!");
  }
};
