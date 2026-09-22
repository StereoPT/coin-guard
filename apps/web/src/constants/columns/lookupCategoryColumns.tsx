"use client";

import { LookupCategoryActions } from "@/components/etl/LookupCategoryActions";
import type { LookupCategoryWithCategoryName } from "@/types/categories";
import { Badge, cn } from "@coin-guard/ui";
import type { ColumnDef } from "@tanstack/react-table";

export const lookupCategoryColumns: ColumnDef<LookupCategoryWithCategoryName>[] =
  [
    {
      accessorKey: "description",
      header: "Description",
      size: 520,
    },
    {
      accessorKey: "categoryName",
      header: "Category",
    },
    {
      accessorKey: "enabled",
      header: "Enabled",
      size: 100,
      cell: ({ row }) => {
        const { enabled } = row.original;

        return (
          <Badge
            className={cn(!enabled && "text-muted-foreground")}
            variant={enabled ? "secondary" : "outline"}
          >
            {enabled ? "Enabled" : "Disabled"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "actions",
      header: () => null,
      size: 50,
      cell: ({ row }) => {
        const lookupCategory = row.original;

        return <LookupCategoryActions lookupCategory={lookupCategory} />;
      },
    },
  ];
