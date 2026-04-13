"use client";

import type { CategoryWithLookups } from "@/types/categories";
import type { ColumnDef } from "@tanstack/react-table";

export const lookupCategoryColumns: ColumnDef<CategoryWithLookups>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
];
