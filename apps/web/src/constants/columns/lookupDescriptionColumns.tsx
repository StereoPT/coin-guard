"use client";

import { LookupDescriptionActions } from "@/components/etl/LookupDescriptionActions";
import { Badge } from "@coin-guard/ui";
import type { LookupDescription } from "@coin-guard/db";
import { cn } from "@coin-guard/ui";
import type { ColumnDef } from "@tanstack/react-table";

export const lookupDescriptionColumns: ColumnDef<LookupDescription>[] = [
  {
    accessorKey: "description",
    header: "Description",
    size: 520,
  },
  {
    accessorKey: "newDescription",
    header: "New description",
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
    header: "Actions",
    size: 50,
    cell: ({ row }) => {
      const lookupDescription = row.original;

      return <LookupDescriptionActions lookupDescription={lookupDescription} />;
    },
  },
];
