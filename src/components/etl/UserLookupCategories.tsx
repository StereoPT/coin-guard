"use client";

import { EmptyState } from "@/components/EmptyState";
import { ErrorAlert } from "@/components/ErrorAlert";
import { AddLookupCategoryDialog } from "@/components/etl/dialogs/AddLookupCategoryDialog";
import { LookupCategoryCard } from "@/components/etl/LookupCategoryCard";
import { lookupCategoryColumns } from "@/constants/columns/lookupCategoryColumns";
import { useGetLookupCategories } from "@/hooks/etl/categories/useGetLookupCategories";
import { DataGrid } from "@stereopt/data-table";
import { TagsIcon } from "lucide-react";

export const UserLookupCategories = () => {
  const { data: lookupCategories } = useGetLookupCategories();

  if (!lookupCategories) {
    return <ErrorAlert />;
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
    <DataGrid
      columns={lookupCategoryColumns}
      config={{
        search: {
          filterFields: ["name"],
          placeholder: "Search lookup categories...",
        },
      }}
      data={lookupCategories}
      render={(index, categoryWithLookups) => (
        <LookupCategoryCard
          categoryWithLookups={categoryWithLookups}
          key={index}
        />
      )}
    />
  );
};
