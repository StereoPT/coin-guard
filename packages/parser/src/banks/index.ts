import { cgdParser } from "./cgd";
import type { BankParser } from "./types";

const bankParsers: Record<string, BankParser> = {
  cgd: cgdParser,
};

export const SUPPORTED_BANK_ALIASES = Object.keys(bankParsers);

const normalizeAlias = (alias: string) => alias.trim().toLowerCase();

export const getBankParser = (alias: string): BankParser => {
  const parser = bankParsers[normalizeAlias(alias)];

  if (!parser) {
    throw new Error(
      `Unsupported bank alias "${alias}". Supported: ${SUPPORTED_BANK_ALIASES.join(", ").toUpperCase()}`,
    );
  }

  return parser;
};
