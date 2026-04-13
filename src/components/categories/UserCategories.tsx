"use client";

import { AddCategoryDialog } from "@/components/categories/dialogs/AddCategoryDialog";
import { EmptyState } from "@/components/EmptyState";
import { ErrorAlert } from "@/components/ErrorAlert";
import { categoryColumns } from "@/constants/columns/categoryColumns";
import { useGetCategories } from "@/hooks/categories/useGetCategories";
import { DataTable } from "@stereopt/data-table";
import { TagsIcon } from "lucide-react";

export const UserCategories = () => {
  const { data: categories } = useGetCategories();

  if (!categories) {
    return <ErrorAlert />;
  }

  if (categories.length <= 0) {
    return (
      <EmptyState
        action={<AddCategoryDialog />}
        description="Click the button below to add your first category"
        icon={TagsIcon}
        title="No categories added yet"
      />
    );
  }

  return (
    <DataTable
      columns={categoryColumns}
      config={{
        search: {
          filterFields: ["name"],
          placeholder: "Search categories...",
        },
      }}
      data={categories}
    />
  );
};
