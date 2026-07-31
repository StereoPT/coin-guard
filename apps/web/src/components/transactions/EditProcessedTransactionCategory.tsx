"use client";

import type { ProcessedTransaction } from "@/actions/transactions/ParseTransaction";
import { useGetCategories } from "@/hooks/categories/useGetCategories";
import { processedTransactionsAtom } from "@/store/transactionsStore";
import { SearchableSelect } from "@coin-guard/ui";
import { useSetAtom } from "jotai";
import { useCallback, useMemo } from "react";

type EditProcessedTransactionCategoryProps = {
  transaction: ProcessedTransaction;
};

export const EditProcessedTransactionCategory = ({
  transaction,
}: EditProcessedTransactionCategoryProps) => {
  const { data: categories } = useGetCategories();
  const setTransactions = useSetAtom(processedTransactionsAtom);

  const handleEditProcessedTransactionCategory = useCallback(
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
      emptyPlaceholder="No category found."
      onChange={handleEditProcessedTransactionCategory}
      options={categoryOptions}
      placeholder="Select a Category"
      searchPlaceholder="Search a category..."
      value={transaction.categoryId}
    />
  );
};
