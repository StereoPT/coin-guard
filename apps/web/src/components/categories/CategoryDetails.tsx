"use client";

import { BudgetDetails } from "@/components/categories/BudgetDetails";
import { TransactionsChart } from "@/components/charts/TransactionsChart";
import { DateRangeSelection } from "@/components/DateRangeSelection";
import { LoadingState } from "@/components/LoadingState";
import { TransactionTabs } from "@/components/transactions/TransactionTabs";
import { useGetCategory } from "@/hooks/categories/useGetCategory";
import { useGetCategoryTransactions } from "@/hooks/categories/useGetCategoryTransactions";
import { categoryTransactionsRangeAtom } from "@/store/categoryStore";
import { useAtom } from "jotai";

type CategoryDetailsProps = {
  categoryId: string;
};

export const CategoryDetails = ({ categoryId }: CategoryDetailsProps) => {
  const { data: category, isPending: isCategoryPending } =
    useGetCategory(categoryId);
  const [range, setRange] = useAtom(categoryTransactionsRangeAtom);
  const {
    data: transactions,
    isFetching,
    isPending: isTransactionsPending,
  } = useGetCategoryTransactions(categoryId, range);

  const isPending = isCategoryPending || isTransactionsPending;

  if (isPending || !category || !transactions) {
    return <LoadingState />;
  }

  return (
    <div className="flex flex-col gap-6">
      <BudgetDetails
        budgetAmount={category.budgetAmount}
        categoryId={category.id}
        range={range}
        transactions={transactions}
      />
      <TransactionTabs
        actions={
          <DateRangeSelection
            isFetching={isFetching}
            onRangeChange={setRange}
            range={range}
          />
        }
        description="Showing category amount over time"
        graph={
          <TransactionsChart
            budgetAmount={category.budgetAmount ?? undefined}
            range={range}
            transactions={transactions}
          />
        }
        title={category.name}
        transactions={transactions}
      />
    </div>
  );
};
