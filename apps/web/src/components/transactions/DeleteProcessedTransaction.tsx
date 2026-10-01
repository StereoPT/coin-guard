"use client";

import { processedTransactionsAtom } from "@/store/transactionsStore";
import type { ProcessedTransaction } from "@coin-guard/parser";
import { Button } from "@coin-guard/ui";
import { Trash2 } from "@coin-guard/ui/icons";
import { useSetAtom } from "jotai";
import { useCallback } from "react";

type DeleteProcessedTransactionProps = {
  transaction: ProcessedTransaction;
};

export const DeleteProcessedTransaction = ({
  transaction,
}: DeleteProcessedTransactionProps) => {
  const setTransactions = useSetAtom(processedTransactionsAtom);

  const handleDeleteProcessedTransaction = useCallback(() => {
    setTransactions((prevTransactions) => {
      return prevTransactions.filter(
        (transactionItem) => transactionItem.id !== transaction.id,
      );
    });
  }, [setTransactions, transaction]);

  return (
    <div className="flex items-center justify-end opacity-0 transition-opacity focus-within:opacity-100 group-hover/row:opacity-100">
      <Button
        aria-label={`Delete ${transaction.description}`}
        onClick={handleDeleteProcessedTransaction}
        size="icon"
        variant="destructive"
      >
        <Trash2 />
      </Button>
    </div>
  );
};
