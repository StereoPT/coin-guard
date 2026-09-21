import type { ProcessedTransaction } from "@coin-guard/parser";
import { atom } from "jotai";

export const processedTransactionsAtom = atom<ProcessedTransaction[]>([]);
