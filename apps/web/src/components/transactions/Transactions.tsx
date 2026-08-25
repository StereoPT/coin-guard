"use client";

import { EmptyState } from "@/components/EmptyState";
import { LoadingState } from "@/components/LoadingState";
import { AddTransaction } from "@/components/transactions/AddTransaction";
import { transactionColumns } from "@/constants/columns/transactionColumns";
import { useGetTransactions } from "@/hooks/transactions/useGetTransactions";
import { DataTable } from "@stereopt/data-table";
import { ArrowLeftRight } from "@coin-guard/ui/icons";

export const Transactions = () => {
  const { data: transactions, isPending } = useGetTransactions();

  if (isPending || !transactions) {
    return <LoadingState />;
  }

  if (transactions.length <= 0) {
    return (
      <EmptyState
        action={<AddTransaction />}
        description="Click the button below to add or import your first transaction"
        icon={ArrowLeftRight}
        title="No transactions added yet"
      />
    );
  }

  return (
    <DataTable
      columns={transactionColumns}
      config={{
        search: {
          filterFields: ["description"],
          placeholder: "Search transactions...",
        },
        filters: [
          { column: "date", type: "date" },
          { column: "type", type: "select" },
        ],
        columnVisibility: {
          type: false,
          date: false,
        },
      }}
      data={transactions}
    />
  );
};
