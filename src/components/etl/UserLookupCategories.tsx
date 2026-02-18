"use client";

import { lookupCategoryColumns } from "@/components/dataTable/columns/lookupCategoryColumns";
import { DataGrid } from "@/components/dataTable/DataGrid";
import { ErrorAlert } from "@/components/ErrorAlert";
import { AddLookupCategoryDialog } from "@/components/etl/dialogs/AddLookupCategoryDialog";
import { LookupCategoryCard } from "@/components/etl/LookupCategoryCard";
import { useGetLookupCategories } from "@/hooks/etl/categories/useGetLookupCategories";
import { fuzzyFilterFn } from "@/lib/dataTable";
import { TagsIcon } from "lucide-react";

const EmptyUserLookupCategories = () => {
  return (
    <div className="flex flex-col gap-4 h-full items-center justify-center">
      <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
        <TagsIcon className="stroke-primary" size={40} />
      </div>
      <div className="flex flex-col gap-1 text-center">
        <p className="font-bold">No lookup categories added yet</p>
        <p className="text-muted-foreground">
          Click the button below to add your first lookup category
        </p>
      </div>
      <AddLookupCategoryDialog />
    </div>
  );
};

export const UserLookupCategories = () => {
  const { data: lookupCategories } = useGetLookupCategories();

  if (!lookupCategories) {
    return <ErrorAlert />;
  }

  if (lookupCategories.length <= 0) {
    return <EmptyUserLookupCategories />;
  }

  return (
    <DataGrid
      columns={lookupCategoryColumns}
      config={{
        filters: {
          search: {
            filterFn: fuzzyFilterFn(["name"]),
            placeholder: "Search lookup categories...",
          },
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
