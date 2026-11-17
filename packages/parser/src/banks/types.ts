import type { ProcessedTransaction } from "../types";

export type BankParser = (buffer: Buffer) => Promise<ProcessedTransaction[]>;
