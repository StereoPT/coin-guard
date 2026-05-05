"use client";

import { AmountBadge } from "@/components/AmountBadge";
import { TransactionActions } from "@/components/transactions/TransactionActions";
import { ROUTES } from "@/constants/routes";
import { dateBetweenFilterFn } from "@/lib/dataTable";
import type { TransactionWithCategory } from "@/types/transactions";
import { Badge } from "@coin-guard/ui";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";

export const transactionColumns: ColumnDef<TransactionWithCategory>[] = [
  {
    accessorKey: "date",
    filterFn: dateBetweenFilterFn,
  },
  {
    accessorKey: "description",
    header: "Description",
    size: 420,
    cell: ({ row }) => {
      const { id, description, date } = row.original;

      return (
        <Link href={ROUTES.transaction(id)}>
          <div className="flex flex-col">
            <div className="font-medium">{description}</div>
            <div className="text-xs text-muted-foreground">
              {format(date, "PPP")}
            </div>
          </div>
        </Link>
      );
    },
  },
  { accessorKey: "type" },
  {
    accessorKey: "category.name",
    header: "Category",
    size: 110,
    cell: ({ row }) => {
      const { category } = row.original;

      return category && <Badge variant="outline">{category.name}</Badge>;
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
    accessorKey: "actions",
    header: "Actions",
    size: 50,
    cell: ({ row }) => {
      const transaction = row.original;

      return <TransactionActions transaction={transaction} />;
    },
  },
];
