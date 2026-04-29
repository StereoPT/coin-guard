"use client";

import type { ProcessedTransaction } from "@/actions/transactions/parseTransaction";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { useGetCategories } from "@/hooks/categories/useGetCategories";
import { processedTransactionsAtom } from "@/store/transactionsStore";
import { useSetAtom } from "jotai";
import { useCallback, useMemo } from "react";

type EditProcessedTransactionProps = {
  transaction: ProcessedTransaction;
};

export const EditProcessedTransaction = ({
  transaction,
}: EditProcessedTransactionProps) => {
  const { data: categories } = useGetCategories();
  const setTransactions = useSetAtom(processedTransactionsAtom);

  const handleEditProcessedTransaction = useCallback(
    (categoryId: string | undefined) => {
      setTransactions((prev) =>
        prev.map((t) => (t === transaction ? { ...t, categoryId } : t)),
      );
    },
    [setTransactions, transaction],
  );

  const categoryOptions = useMemo(() => {
    if (!categories) return [];

    return categories.map((category) => ({
      value: category.id,
      label: category.name,
    }));
  }, [categories]);

  return (
    <SearchableSelect
      emptyPlaceholer="No category found."
      onChange={handleEditProcessedTransaction}
      options={categoryOptions}
      placeholder="Select a Category"
      searchPlaceholder="Search a category..."
      value={transaction.categoryId}
    />
  );
};
