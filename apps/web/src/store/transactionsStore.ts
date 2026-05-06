import type { ProcessedTransaction } from "@/actions/transactions/ParseTransaction";
import { atom } from "jotai";

export const processedTransactionsAtom = atom<ProcessedTransaction[]>([]);
