import { AmountBadge } from "@/components/AmountBadge";
import { ROUTES } from "@/constants/routes";
import type { Transaction } from "@coin-guard/db";
import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@coin-guard/ui";
import { format } from "date-fns";
import { Eye } from "@coin-guard/ui/icons";
import Link from "next/link";

type DashboardLastTransactionsProps = {
  transactions: Transaction[];
};

export const DashboardLastTransactions = ({
  transactions,
}: DashboardLastTransactionsProps) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-col items-stretch border-b sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1">
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest five transactions</CardDescription>
        </div>
        <CardAction>
          <Button
            render={<Link href={ROUTES.transactions} />}
            nativeButton={false}
            size="sm"
            variant="outline"
          >
            <Eye />
            View All
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        {transactions.map((transaction) => {
          return (
            <Link
              className="flex p-3 rounded-lg border gap-2 hover:bg-secondary/80 transition-colors"
              href={ROUTES.transaction(transaction.id)}
              key={transaction.id}
            >
              <div className="flex flex-1 items-center flex-wrap justify-between gap-1">
                <div className="flex items-center space-x-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {format(transaction.date, "PPP")}
                    </p>
                  </div>
                </div>
                <AmountBadge
                  amount={transaction.amount}
                  type={transaction.type}
                />
              </div>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
};
