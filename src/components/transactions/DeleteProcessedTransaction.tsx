"use client";

import type { ProcessedTransaction } from "@/actions/transactions/parseTransaction";
import { Button } from "@/components/ui/button";
import { processedTransactionsAtom } from "@/store/transactionsStore";
import { useSetAtom } from "jotai";
import { Trash2 } from "lucide-react";
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
