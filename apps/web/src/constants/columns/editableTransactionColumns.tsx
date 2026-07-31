"use client";

import type { ProcessedTransaction } from "@/actions/transactions/ParseTransaction";
import { AmountBadge } from "@/components/AmountBadge";
import { DeleteProcessedTransaction } from "@/components/transactions/DeleteProcessedTransaction";
import { EditProcessedTransactionCategory } from "@/components/transactions/EditProcessedTransactionCategory";
import { EditProcessedTransactionType } from "@/components/transactions/EditProcessedTransactionType";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const editableTransactionColumns: ColumnDef<ProcessedTransaction>[] = [
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
    accessorKey: "type",
    header: "Type",
    size: 90,
    cell: ({ row }) => {
      const transaction = row.original;

      return <EditProcessedTransactionType transaction={transaction} />;
    },
  },
  {
    accessorKey: "categoryId",
    header: "Category",
    size: 140,
    cell: ({ row }) => {
      const transaction = row.original;

      return <EditProcessedTransactionCategory transaction={transaction} />;
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
