"use client";

import type { ProcessedTransaction } from "@/actions/transactions/parseTransaction";
import { AmountBadge } from "@/components/AmountBadge";
import { DeleteProcessedTransaction } from "@/components/transactions/DeleteProcessedTransaction";
import { EditProcessedTransaction } from "@/components/transactions/EditProcessedTransaction";
import { formatCurrency } from "@/lib/formatter";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const editableColumns: ColumnDef<ProcessedTransaction>[] = [
  {
    accessorKey: "description",
    header: "Description",
    size: 300,
    cell: ({ row }) => {
      const { description, date } = row.original;

      return (
        <div className="flex flex-col">
          <div className="font-medium">{description}</div>
          <div className="text-xs text-muted-foreground">
            {format(date, "PPP")}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    size: 90,
    cell: ({ row }) => {
      const { type, amount } = row.original;

      return <AmountBadge amount={amount} type={type} />;
    },
  },
  {
    accessorKey: "balance",
    header: "Balance",
    size: 90,
    cell: ({ row }) => {
      const { balance } = row.original;

      return formatCurrency(balance);
    },
  },
  {
    accessorKey: "categoryId",
    header: "Category",
    size: 140,
    cell: ({ row }) => {
      const transaction = row.original;

      return <EditProcessedTransaction transaction={transaction} />;
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    size: 50,
    cell: ({ row }) => {
      const transaction = row.original;
      return <DeleteProcessedTransaction transaction={transaction} />;
    },
  },
];
