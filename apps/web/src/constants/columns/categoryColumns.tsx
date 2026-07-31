"use client";

import { CategoryActions } from "@/components/categories/CategoryActions";
import { ROUTES } from "@/constants/routes";
import { formatCurrency } from "@/lib/formatter";
import type { Category } from "@coin-guard/db";
import { Badge } from "@coin-guard/ui";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const categoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Name",
    size: 520,
    cell: ({ row }) => {
      const { id, name } = row.original;

      return (
        <Link href={ROUTES.category(id)}>
          <div className="font-medium">{name}</div>
        </Link>
      );
    },
  },
  {
    accessorKey: "budgetAmount",
    header: "Budget Amount",
    size: 100,
    cell: ({ row }) => {
      const { budgetAmount } = row.original;

      return (
        <Badge variant="outline">
          {budgetAmount !== null ? formatCurrency(budgetAmount) : "N/A"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    size: 50,
    cell: ({ row }) => {
      const category = row.original;

      return <CategoryActions category={category} />;
    },
  },
];
