import { type BankFileAccept, getBankFileAccept } from "./banks/accept";
import { getBankParser } from "./banks";
import { FIVE_MEGABYTES } from "./constants";

export const ParseTransactionFile = async (file: File, alias: string) => {
  try {
    if (!file) {
      throw new Error("No file uploaded!");
    }

    if (file.size > FIVE_MEGABYTES) {
      throw new Error("File size must be less than 5MB");
    }

    if (!alias) {
      throw new Error("Bank alias is required");
    }

    // Throws if the alias has no parser
    const parseBank = getBankParser(alias);

    const accept = getBankFileAccept(alias) as BankFileAccept;
    const fileName = file.name.toLowerCase();

    if (
      !accept.mimeTypes.includes(file.type) ||
      !accept.extensions.some((extension) => fileName.endsWith(extension))
    ) {
      throw new Error(
        `Only ${accept.extensions.join(", ")} files are allowed for ${alias.trim()}`,
      );
    }

    const arrayBuffer = await file.arrayBuffer();

    return await parseBank(Buffer.from(arrayBuffer));
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: error logging
    console.error("Failed to process file:", error);
    throw error instanceof Error ? error : new Error("Failed to process file!");
  }
};
