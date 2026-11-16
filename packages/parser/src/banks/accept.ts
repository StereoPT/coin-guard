// Pure data, no Node imports: safe to use from client components through
// the "@coin-guard/parser/bank-accept" export.

export type BankFileAccept = {
  extensions: readonly string[];
  mimeTypes: readonly string[];
};

const CSV_ACCEPT = {
  extensions: [".csv"],
  mimeTypes: ["text/csv"],
} as const satisfies BankFileAccept;

const XLSX_ACCEPT = {
  extensions: [".xlsx"],
  mimeTypes: [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
} as const satisfies BankFileAccept;

export const BANK_FILE_ACCEPT = {
  cgd: CSV_ACCEPT,
  ca: XLSX_ACCEPT,
} as const satisfies Record<string, BankFileAccept>;

export type BankAlias = keyof typeof BANK_FILE_ACCEPT;

export const normalizeAlias = (alias: string) => alias.trim().toLowerCase();

export const isBankAlias = (alias: string): alias is BankAlias =>
  Object.hasOwn(BANK_FILE_ACCEPT, alias);

export const getBankFileAccept = (
  alias: string,
): BankFileAccept | undefined => {
  const key = normalizeAlias(alias);

  return isBankAlias(key) ? BANK_FILE_ACCEPT[key] : undefined;
};

// Shape expected by the Dropzone `accept` prop: { mimeType: extensions[] }
export const toDropzoneAccept = (accept: BankFileAccept) =>
  Object.fromEntries(
    accept.mimeTypes.map((mimeType) => [mimeType, [...accept.extensions]]),
  );
