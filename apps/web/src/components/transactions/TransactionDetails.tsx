"use client";

import { ErrorAlert } from "@/components/ErrorAlert";
import { useGetTransaction } from "@/hooks/transactions/useGetTransaction";

import { TransactionsChart } from "@/components/charts/TransactionsChart";
import { CountUpWrapper } from "@/components/CountUpWrapper";
import { TransactionTable } from "@/components/tables/TransactionTable";
import { formatCurrency } from "@/lib/formatter";
import { CountType } from "@/types/dashboard";
import { TransactionType } from "@coin-guard/db";
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@coin-guard/ui";
import { format } from "date-fns";
import {
  AreaChart,
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  Calendar,
  FileText,
  Table2,
  Tag,
} from "lucide-react";

type TransactionDetailsProps = {
  transactionId: string;
};

export const TransactionDetails = ({
  transactionId,
}: TransactionDetailsProps) => {
  const { data: transaction } = useGetTransaction(transactionId);

  if (!transaction) {
    return <ErrorAlert />;
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="grid grid-cols-3">
        <div className="col-span-2">
          <CardHeader>
            <CardDescription className="flex items-center gap-2 capitalize">
              {transaction.transaction.type === TransactionType.CREDIT ? (
                <ArrowUpRight className="size-4" />
              ) : (
                <ArrowDownRight className="size-4" />
              )}
              {transaction.transaction.type.toLowerCase()}
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">
              <CountUpWrapper
                type={CountType.MONEY}
                value={transaction.transaction.amount}
              />
            </CardTitle>
            <CardTitle>{transaction.transaction.description}</CardTitle>
          </CardHeader>
          <CardContent className="mt-6 grid grid-cols-3 gap-4 text-sm">
            <div className="flex flex-row gap-4 items-center">
              <div className="rounded bg-neutral-200 text-neutral-500 p-2">
                <Calendar className="size-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground">Date</span>
                {format(transaction.transaction.date, "PPP")}
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <div className="rounded bg-neutral-200 text-neutral-500 p-2">
                <Tag className="size-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground">Category</span>
                <Badge variant="outline">
                  {transaction.transaction.category?.name || "N/A"}
                </Badge>
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <div className="rounded bg-neutral-200 text-neutral-500 p-2">
                <Banknote className="size-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground">Balance After</span>
                {formatCurrency(transaction.transaction.balance)}
              </div>
            </div>
          </CardContent>
        </div>
        <div className="border-l">
          <CardHeader>
            <CardDescription className="flex items-center gap-2 capitalize">
              <FileText className="size-4" />
              Notes
            </CardDescription>
          </CardHeader>
          <CardContent>
            {transaction.transaction.note ? (
              <p className="text-sm">{transaction.transaction.note}</p>
            ) : (
              <div className="flex flex-col w-full h-full items-center justify-center gap-2 py-4">
                <div className="rounded bg-neutral-200 text-neutral-500 p-2">
                  <FileText className="size-4" />
                </div>
                <div className="text-center text-sm">
                  No notes added
                  <div className="text-xs text-muted-foreground mt-1">
                    Edit transaction to add notes
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </div>
      </Card>
      <Tabs className="w-full" defaultValue="graph">
        <TabsList className="min-w-64">
          <TabsTrigger value="graph">
            <AreaChart /> Graph
          </TabsTrigger>
          <TabsTrigger value="table">
            <Table2 />
            Table
          </TabsTrigger>
        </TabsList>
        <TabsContent value="graph">
          <TransactionsChart transactions={transaction.all} />
        </TabsContent>
        <TabsContent value="table">
          <TransactionTable transactions={transaction.all} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
