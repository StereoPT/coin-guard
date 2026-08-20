"use client";

import { BudgetDetails } from "@/components/categories/BudgetDetails";
import { TransactionsChart } from "@/components/charts/TransactionsChart";
import { DateRangeSelection } from "@/components/DateRangeSelection";
import { ErrorAlert } from "@/components/ErrorAlert";
import { TransactionTabs } from "@/components/transactions/TransactionTabs";
import { useGetCategory } from "@/hooks/categories/useGetCategory";
import { useGetCategoryTransactions } from "@/hooks/categories/useGetCategoryTransactions";
import { categoryTransactionsRangeAtom } from "@/store/categoryStore";
import { useAtom } from "jotai";

type CategoryDetailsProps = {
  categoryId: string;
};

export const CategoryDetails = ({ categoryId }: CategoryDetailsProps) => {
  const { data: category } = useGetCategory(categoryId);
  const [range, setRange] = useAtom(categoryTransactionsRangeAtom);
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
        actions={<DateRangeSelection onRangeChange={setRange} range={range} />}
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
