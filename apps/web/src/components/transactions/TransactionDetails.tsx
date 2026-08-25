"use client";

import { LoadingState } from "@/components/LoadingState";
import { useGetRelatedTransactions } from "@/hooks/transactions/useGetRelatedTransactions";
import { useGetTransaction } from "@/hooks/transactions/useGetTransaction";

import { BankAccountAvatar } from "@/components/bankAccounts/BankAccountAvatar";
import { TransactionsChart } from "@/components/charts/TransactionsChart";
import { CountUpWrapper } from "@/components/CountUpWrapper";
import { DateRangeSelection } from "@/components/DateRangeSelection";
import { TransactionTabs } from "@/components/transactions/TransactionTabs";
import { relatedTransactionsRangeAtom } from "@/store/transactionStore";
import { CountType } from "@/types/dashboard";
import { TransactionType } from "@coin-guard/db";
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@coin-guard/ui";
import {
  ArrowDownRight,
  ArrowLeftRight,
  ArrowUpRight,
  Calendar,
  FileText,
  Tag,
} from "@coin-guard/ui/icons";
import { format } from "date-fns";
import { useAtom } from "jotai";

const typeIcons = {
  [TransactionType.CREDIT]: <ArrowUpRight className="size-4" />,
  [TransactionType.DEBIT]: <ArrowDownRight className="size-4" />,
  [TransactionType.TRANSFER]: <ArrowLeftRight className="size-4" />,
};

type TransactionDetailsProps = {
  transactionId: string;
};

export const TransactionDetails = ({
  transactionId,
}: TransactionDetailsProps) => {
  const [range, setRange] = useAtom(relatedTransactionsRangeAtom);

  const { data: transaction, isPending: isTransactionPending } =
    useGetTransaction(transactionId);
  const {
    data: relatedTransactions,
    isFetching,
    isPending: isRelatedTransactionsPending,
  } = useGetRelatedTransactions(transaction?.description ?? "", range);

  const isPending = isTransactionPending || isRelatedTransactionsPending;

  if (isPending || !transaction || !relatedTransactions) {
    return <LoadingState />;
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="grid grid-cols-3">
        <div className="col-span-2">
          <CardHeader>
            <CardDescription className="flex items-center gap-2 capitalize">
              {typeIcons[transaction.type]}
              {transaction.type.toLowerCase()}
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">
              <CountUpWrapper
                type={CountType.MONEY}
                value={transaction.amount}
              />
            </CardTitle>
            <CardTitle>{transaction.description}</CardTitle>
          </CardHeader>
          <CardContent className="mt-6 grid grid-cols-3 gap-4 text-sm">
            <div className="flex flex-row gap-4 items-center">
              <BankAccountAvatar alias={transaction.account.alias ?? ""} />
              <div className="flex flex-col">
                <span className="text-muted-foreground">Bank</span>
                {transaction.account.name}
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <div className="rounded bg-neutral-200 text-neutral-500 p-2">
                <Calendar className="size-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground">Date</span>
                {format(transaction.date, "PPP")}
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <div className="rounded bg-neutral-200 text-neutral-500 p-2">
                <Tag className="size-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground">Category</span>
                <Badge variant="outline">
                  {transaction.category?.name || "N/A"}
                </Badge>
              </div>
            </div>
            {/* <div className="flex flex-row gap-4 items-center">
              <div className="rounded bg-neutral-200 text-neutral-500 p-2">
                <Banknote className="size-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground">Balance After</span>
                {formatCurrency(transaction.balance)}
              </div>
            </div> */}
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
            {transaction.note ? (
              <p className="text-sm">{transaction.note}</p>
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

      <TransactionTabs
        actions={
          <DateRangeSelection
            isFetching={isFetching}
            onRangeChange={setRange}
            range={range}
          />
        }
        description="Showing transaction amount over time"
        graph={
          <TransactionsChart range={range} transactions={relatedTransactions} />
        }
        title="Transactions"
        transactions={relatedTransactions}
      />
    </div>
  );
};
