import { getBankParser } from "./banks";
import { CSV_EXTENSION, CSV_TYPE, FIVE_MEGABYTES } from "./constants";

export const ParseTransactionFile = async (file: File, alias: string) => {
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

    if (!alias) {
      throw new Error("Bank alias is required");
    }

    const parseBank = getBankParser(alias);

    const arrayBuffer = await file.arrayBuffer();

    return await parseBank(Buffer.from(arrayBuffer));
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: error logging
    console.error("Failed to process CSV file:", error);
    throw error instanceof Error
      ? error
      : new Error("Failed to process CSV file!");
  }
};
