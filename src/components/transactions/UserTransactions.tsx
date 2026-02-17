"use client";

import { transactionColumns } from "@/components/dataTable/columns/transactionColumns";
import { DataTable } from "@/components/dataTable/DataTable";
import { ErrorAlert } from "@/components/ErrorAlert";
import { AddTransaction } from "@/components/transactions/AddTransaction";
import { useGetTransactions } from "@/hooks/transactions/useGetTransactions";
import { fuzzyFilterFn } from "@/lib/dataTable";
import { ArrowLeftRight } from "lucide-react";

const EmptyUserTransactions = () => {
  return (
    <div className="flex flex-col gap-4 h-full items-center justify-center">
      <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
        <ArrowLeftRight className="stroke-primary" size={40} />
      </div>
      <div className="flex flex-col gap-1 text-center">
        <p className="font-bold">No transactions added yet</p>
        <p className="text-muted-foreground">
          Click the button below to add or import your first transaction
        </p>
      </div>
      <AddTransaction />
    </div>
  );
};

export const UserTransactions = () => {
  const { data: transactions } = useGetTransactions();

  if (!transactions) {
    return <ErrorAlert />;
  }

  if (transactions.length <= 0) {
    return <EmptyUserTransactions />;
  }

  return (
    <DataTable
      columns={transactionColumns}
      config={{
        filters: {
          search: {
            filterFn: fuzzyFilterFn(["description"]),
            placeholder: "Search transactions...",
          },
          filter: [
            { column: "date", type: "date" },
            { column: "type", type: "select" },
          ],
        },
        columnVisibility: {
          type: false,
          date: false,
        },
      }}
      data={transactions}
    />
  );
};
