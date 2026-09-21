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
        (transactionItem) => transactionItem !== transaction,
      );
    });
  }, [setTransactions, transaction]);

  return (
    <Button
      onClick={handleDeleteProcessedTransaction}
      size="icon"
      variant="destructive"
    >
      <Trash2 />
    </Button>
  );
};
