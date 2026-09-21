"use client";

import { processedTransactionsAtom } from "@/store/transactionsStore";
import type { TransactionType } from "@coin-guard/db";
import type { ProcessedTransaction } from "@coin-guard/parser";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@coin-guard/ui";
import { useSetAtom } from "jotai";
import { useCallback } from "react";

const transactionTypeItems = [
  { value: "DEBIT", label: "Debit" },
  { value: "CREDIT", label: "Credit" },
  { value: "TRANSFER", label: "Transfer" },
];

type EditProcessedTransactionTypeProps = {
  transaction: ProcessedTransaction;
};

export const EditProcessedTransactionType = ({
  transaction,
}: EditProcessedTransactionTypeProps) => {
  const setTransactions = useSetAtom(processedTransactionsAtom);

  const handleEditProcessedTransactionType = useCallback(
    (type: TransactionType | null) => {
      if (!type) return;

      setTransactions((prev) =>
        prev.map((t) => (t === transaction ? { ...t, type } : t)),
      );
    },
    [setTransactions, transaction],
  );

  return (
    <Select
      items={transactionTypeItems}
      onValueChange={handleEditProcessedTransactionType}
      value={transaction.type}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Transaction Type" />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false}>
        <SelectGroup>
          <SelectItem value="DEBIT">Debit</SelectItem>
          <SelectItem value="CREDIT">Credit</SelectItem>
          <SelectItem value="TRANSFER">Transfer</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
