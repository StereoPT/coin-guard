"use client";

import { ErrorAlert } from "@/components/ErrorAlert";
import { useGetTransaction } from "@/hooks/transactions/useGetTransaction";

import { AmountBadge } from "@/components/AmountBadge";
import { TransactionAreaChart } from "@/components/charts/TransactionAreaChart";
import { TransactionTable } from "@/components/tables/TransactionTable";
import { Badge } from "@/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { format } from "date-fns";
import { Calendar } from "lucide-react";

type UserTransactionProps = {
  transactionId: string;
};

export const UserTransaction = ({ transactionId }: UserTransactionProps) => {
  const { data: transaction } = useGetTransaction(transactionId);

  if (!transaction) {
    return <ErrorAlert />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Transaction</CardTitle>
            <CardDescription>
              {transaction.transaction.description}
            </CardDescription>
            {transaction.transaction.category && (
              <CardAction>
                <Badge variant="outline">
                  {transaction.transaction.category.name}
                </Badge>
              </CardAction>
            )}
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div>
                <AmountBadge
                  amount={transaction.transaction.amount}
                  type={transaction.transaction.type}
                />
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar size={14} />
                {format(transaction.transaction.date, "PPP")}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Notes</CardTitle>
            <CardDescription>{transaction.transaction.note}</CardDescription>
          </CardHeader>
        </Card>
      </div>
      <TransactionAreaChart transactions={transaction.all} />
      <TransactionTable transactions={transaction.all} />
    </div>
  );
};
