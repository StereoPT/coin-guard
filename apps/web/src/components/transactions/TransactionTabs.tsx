"use client";

import { TransactionsChart } from "@/components/charts/TransactionsChart";
import { CountUpWrapper } from "@/components/CountUpWrapper";
import { TransactionTable } from "@/components/tables/TransactionTable";
import { CountType } from "@/types/dashboard";
import type { TransactionWithCategory } from "@/types/transactions";
import {
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
import { AreaChart, Table2 } from "lucide-react";

type TransactionTabsProps = {
  transactions: TransactionWithCategory[];
  title: string;
  description: string;
};

export const TransactionTabs = ({
  transactions,
  title,
  description,
}: TransactionTabsProps) => {
  const sum = transactions.reduce((acc, t) => (acc += t.amount), 0);
  const average = transactions.length === 0 ? 0 : sum / transactions.length;

  return (
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
      <Card className="py-0 gap-0">
        <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-0!">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex">
            <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
              <span className="text-muted-foreground text-xs">Sum</span>
              <span className="text-lg leading-none font-bold sm:text-3xl">
                <CountUpWrapper type={CountType.MONEY} value={sum} />
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
              <span className="text-muted-foreground text-xs">Average</span>
              <span className="text-lg leading-none font-bold sm:text-3xl">
                <CountUpWrapper type={CountType.MONEY} value={average} />
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <TabsContent value="graph">
            <TransactionsChart transactions={transactions} />
          </TabsContent>
          <TabsContent value="table">
            <TransactionTable transactions={transactions} />
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
};
