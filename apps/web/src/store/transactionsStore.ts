import type { ProcessedTransaction } from "@/actions/transactions/parseTransaction";
import { atom } from "jotai";

export const processedTransactionsAtom = atom<ProcessedTransaction[]>([]);
