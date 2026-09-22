"use client";

import { AmountText } from "@/components/AmountText";
import { DeleteProcessedTransaction } from "@/components/transactions/DeleteProcessedTransaction";
import { EditProcessedTransactionCategory } from "@/components/transactions/EditProcessedTransactionCategory";
import { EditProcessedTransactionType } from "@/components/transactions/EditProcessedTransactionType";
import type { ProcessedTransaction } from "@coin-guard/parser";
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
    header: () => <div className="text-right">Amount</div>,
    size: 90,
    cell: ({ row }) => {
      const { type, amount } = row.original;

      return (
        <div className="flex justify-end">
          <AmountText amount={amount} type={type} />
        </div>
      );
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
