"use client";

import { TransactionsChart } from "@/components/charts/TransactionsChart";
import { ErrorAlert } from "@/components/ErrorAlert";
import { TransactionTable } from "@/components/tables/TransactionTable";
import { useGetCategory } from "@/hooks/categories/useGetCategory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@coin-guard/ui";
import { AreaChart, Table2 } from "lucide-react";

type CategoryDetailsProps = {
  categoryId: string;
};

export const CategoryDetails = ({ categoryId }: CategoryDetailsProps) => {
  const { data: category } = useGetCategory(categoryId);

  if (!category) {
    return <ErrorAlert />;
  }

  return (
    <div className="flex flex-col gap-6">
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
          <TransactionsChart
            description="Showing category amount over time"
            title={category.name}
            transactions={category.transactions}
          />
        </TabsContent>
        <TabsContent value="table">
          <TransactionTable transactions={category.transactions} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
