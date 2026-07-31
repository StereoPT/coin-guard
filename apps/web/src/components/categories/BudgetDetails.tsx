import { EditCategoryDialog } from "@/components/categories/dialogs/EditCategoryDialog";
import { formatCurrency } from "@/lib/formatter";
import type { CategoryWithTransactions } from "@/types/categories";
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
import {
  endOfMonth,
  isWithinInterval,
  startOfMonth,
  subMonths,
} from "date-fns";

const getIndicatorClassName = (percentage: number) => {
  if (percentage > 100) return "bg-destructive";
  if (percentage >= 80) return "bg-amber-500";
  return "bg-teal-600";
};

type BudgetDetailsProps = {
  category: CategoryWithTransactions;
};

export const BudgetDetails = ({ category }: BudgetDetailsProps) => {
  const lastMonthRange = {
    start: startOfMonth(subMonths(new Date(), 1)),
    end: endOfMonth(subMonths(new Date(), 1)),
  };

  const spent = category.transactions
    .filter(
      (transaction) =>
        transaction.type === TransactionType.DEBIT &&
        isWithinInterval(transaction.date, lastMonthRange),
    )
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const budgetAmount = category.budgetAmount ?? 0;
  const percentage = budgetAmount > 0 ? (spent / budgetAmount) * 100 : 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Budget</CardTitle>
        {category.budgetAmount === null && (
          <>
            <CardDescription>No budget set for this category</CardDescription>
            <CardAction>
              <EditCategoryDialog
                categoryId={category.id}
                trigger
                triggerIcon={<PlusCircle />}
                triggerLabel="Set a Budget"
                triggerVariant="outline"
              />
            </CardAction>
          </>
        )}
      </CardHeader>
      {category.budgetAmount !== null && (
        <CardContent className="flex flex-col gap-2">
          <Progress
            indicatorClassName={getIndicatorClassName(percentage)}
            value={Math.min(percentage, 100)}
          />
          <p className="text-sm text-muted-foreground">
            <b>{formatCurrency(spent)}</b> of{" "}
            <b>{formatCurrency(budgetAmount)}</b> spent last month
          </p>
        </CardContent>
      )}
    </Card>
  );
};
