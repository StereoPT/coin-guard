"use client";

import { EmptyState } from "@/components/EmptyState";
import { AddLookupCategoryDialog } from "@/components/etl/dialogs/AddLookupCategoryDialog";
import { LoadingState } from "@/components/LoadingState";
import { lookupCategoryColumns } from "@/constants/columns/lookupCategoryColumns";
import { useGetLookupCategories } from "@/hooks/etl/categories/useGetLookupCategories";
import { TagsIcon } from "@coin-guard/ui/icons";
import { DataTable } from "@stereopt/data-table";

export const UserLookupCategories = () => {
  const { data: lookupCategories, isPending } = useGetLookupCategories();

  if (isPending || !lookupCategories) {
    return <LoadingState />;
  }

  if (lookupCategories.length <= 0) {
    return (
      <EmptyState
        action={<AddLookupCategoryDialog trigger />}
        description="Click the button below to add your first lookup category"
        icon={TagsIcon}
        title="No lookup categories added yet"
      />
    );
  }

  return (
    <DataTable
      columns={lookupCategoryColumns}
      config={{
        groupBy: "categoryName",
        columnVisibility: { categoryName: false },
        search: {
          filterFields: ["description", "categoryName"],
          placeholder: "Search lookup categories...",
        },
      }}
      data={lookupCategories}
    />
  );
};
