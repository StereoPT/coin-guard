import { AmountBadge } from "@/components/AmountBadge";
import { Card } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import type { Transaction } from "@/generated/prisma";
import { cn } from "@/lib/utils";
import type { ClassValue } from "clsx";
import { format } from "date-fns";
import Link from "next/link";

type DisplayLastTransactionsProps = {
  className: ClassValue;
  transactions: Transaction[];
};

export const DisplayLastTransactions = ({
  className,
  transactions,
}: DisplayLastTransactionsProps) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {transactions.map((transaction) => {
        return (
          <Card
            className="px-4 py-2 cursor-pointer hover:bg-muted"
            key={transaction.id}
          >
            <Link
              className="flex w-full justify-between items-center"
              href={ROUTES.transaction(transaction.id)}
            >
              <div className="flex flex-col">
                <div className="text-sm font-bold">
                  {transaction.description}
                </div>
                <div className="text-xs text-muted-foreground">
                  {format(transaction.date, "PPP")}
                </div>
              </div>
              <AmountBadge
                amount={transaction.amount}
                type={transaction.type}
              />
            </Link>
          </Card>
        );
      })}
    </div>
  );
};
