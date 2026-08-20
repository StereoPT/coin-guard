"use client";

import { EditCategoryDialog } from "@/components/categories/dialogs/EditCategoryDialog";
import { useGetCategoryTransactions } from "@/hooks/categories/useGetCategoryTransactions";
import { getLastMonthRange } from "@/lib/date";
import { formatCurrency } from "@/lib/formatter";
import { TransactionType } from "@coin-guard/db";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
} from "@coin-guard/ui";
import { PlusCircle } from "@coin-guard/ui/icons";

const getIndicatorClassName = (percentage: number) => {
  if (percentage > 100) return "bg-destructive";
  if (percentage >= 80) return "bg-amber-500";
  return "bg-teal-600";
};

type BudgetDetailsProps = {
  categoryId: string;
  budgetAmount: number | null;
};

export const BudgetDetails = ({
  categoryId,
  budgetAmount,
}: BudgetDetailsProps) => {
  const { data: transactions } = useGetCategoryTransactions(
    categoryId,
    getLastMonthRange(),
  );

  const spent = (transactions ?? [])
    .filter((transaction) => transaction.type === TransactionType.DEBIT)
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const amount = budgetAmount ?? 0;
  const percentage = amount > 0 ? (spent / amount) * 100 : 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Budget</CardTitle>
        {budgetAmount === null && (
          <>
            <CardDescription>No budget set for this category</CardDescription>
            <CardAction>
              <EditCategoryDialog
                categoryId={categoryId}
                trigger
                triggerIcon={<PlusCircle />}
                triggerLabel="Set a Budget"
                triggerVariant="outline"
              />
            </CardAction>
          </>
        )}
      </CardHeader>
      {budgetAmount !== null && (
        <CardContent className="flex flex-col gap-2">
          <Progress
            indicatorClassName={getIndicatorClassName(percentage)}
            value={Math.min(percentage, 100)}
          />
          <p className="text-sm text-muted-foreground">
            <b>{formatCurrency(spent)}</b> of <b>{formatCurrency(amount)}</b>{" "}
            spent last month
          </p>
        </CardContent>
      )}
    </Card>
  );
};
