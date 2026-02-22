"use client";

import { AddCategoryDialog } from "@/components/categories/dialogs/AddCategoryDialog";
import { categoryColumns } from "@/components/dataTable/columns/categoryColumns";
import { DataTable } from "@/components/dataTable/DataTable";
import { ErrorAlert } from "@/components/ErrorAlert";
import { useGetCategories } from "@/hooks/categories/useGetCategories";
import { fuzzyFilterFn } from "@/lib/dataTable";
import { TagsIcon } from "lucide-react";

const EmptyUserCategories = () => {
  return (
    <div className="flex flex-col gap-4 h-full items-center justify-center">
      <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
        <TagsIcon className="stroke-primary" size={40} />
      </div>
      <div className="flex flex-col gap-1 text-center">
        <p className="font-bold">No categories added yet</p>
        <p className="text-muted-foreground">
          Click the button below to add your first category
        </p>
      </div>
      <AddCategoryDialog />
    </div>
  );
};

export const UserCategories = () => {
  const { data: categories } = useGetCategories();

  if (!categories) {
    return <ErrorAlert />;
  }

  if (categories.length <= 0) {
    return <EmptyUserCategories />;
  }

  return (
    <DataTable
      columns={categoryColumns}
      config={{
        filters: {
          search: {
            filterFn: fuzzyFilterFn(["name"]),
            placeholder: "Search categories...",
          },
        },
      }}
      data={categories}
    />
  );
};
