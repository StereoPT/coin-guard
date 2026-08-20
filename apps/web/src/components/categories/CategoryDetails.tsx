"use client";

import { BudgetDetails } from "@/components/categories/BudgetDetails";
import { CategoryTransactionsDateSelection } from "@/components/categories/CategoryTransactionsDateSelection";
import { ErrorAlert } from "@/components/ErrorAlert";
import { TransactionTabs } from "@/components/transactions/TransactionTabs";
import { useGetCategory } from "@/hooks/categories/useGetCategory";
import { useGetCategoryTransactions } from "@/hooks/categories/useGetCategoryTransactions";
import { categoryTransactionsRangeAtom } from "@/store/categoryStore";
import { useAtomValue } from "jotai";

type CategoryDetailsProps = {
  categoryId: string;
};

export const CategoryDetails = ({ categoryId }: CategoryDetailsProps) => {
  const { data: category } = useGetCategory(categoryId);
  const range = useAtomValue(categoryTransactionsRangeAtom);
  const { data: transactions } = useGetCategoryTransactions(categoryId, range);

  if (!category || !transactions) {
    return <ErrorAlert />;
  }

  return (
    <div className="flex flex-col gap-6">
      <BudgetDetails
        budgetAmount={category.budgetAmount}
        categoryId={category.id}
      />
      <TransactionTabs
        actions={<CategoryTransactionsDateSelection />}
        budgetAmount={category.budgetAmount ?? undefined}
        description="Showing category amount over time"
        range={range}
        title={category.name}
        transactions={transactions}
      />
    </div>
  );
};
