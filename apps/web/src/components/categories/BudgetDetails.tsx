"use client";

import { EditCategoryDialog } from "@/components/categories/dialogs/EditCategoryDialog";
import { getBudgetScaleFactor } from "@/lib/date";
import type { DateRange } from "@/lib/date";
import { formatCurrency } from "@/lib/formatter";
import type { Transaction } from "@coin-guard/db";
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
  transactions: Transaction[];
  range: DateRange;
};

export const BudgetDetails = ({
  categoryId,
  budgetAmount,
  transactions,
  range,
}: BudgetDetailsProps) => {
  const spent = transactions
    .filter((transaction) => transaction.type === TransactionType.DEBIT)
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const scaledBudget =
    budgetAmount !== null ? budgetAmount * getBudgetScaleFactor(range) : null;
  const amount = scaledBudget ?? 0;
  const percentage = amount > 0 ? (spent / amount) * 100 : 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget</CardTitle>
        {budgetAmount === null ? (
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
        ) : (
          <CardDescription>
            {formatCurrency(budgetAmount)} / month
          </CardDescription>
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
            spent in the selected period
          </p>
        </CardContent>
      )}
    </Card>
  );
};
