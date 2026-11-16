import { type BankAlias, isBankAlias, normalizeAlias } from "./accept";
import { caParser } from "./ca";
import { cgdParser } from "./cgd";
import type { BankParser } from "./types";

// Typed on BankAlias so every bank in accept.ts must have a parser here
const bankParsers: Record<BankAlias, BankParser> = {
  cgd: cgdParser,
  ca: caParser,
};

export const SUPPORTED_BANK_ALIASES = Object.keys(bankParsers);

export const getBankParser = (alias: string): BankParser => {
  const key = normalizeAlias(alias);

  if (!isBankAlias(key)) {
    throw new Error(
      `Unsupported bank alias "${alias}". Supported: ${SUPPORTED_BANK_ALIASES.join(", ").toUpperCase()}`,
    );
  }

  return bankParsers[key];
};
