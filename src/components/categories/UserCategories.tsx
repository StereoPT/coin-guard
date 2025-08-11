'use client';

import { AddCategoryDialog } from '@/components/categories/AddCategoryDialog';
import { columns } from '@/components/categories/columns';
import { DataTable } from '@/components/dataTable/DataTable';
import { ErrorAlert } from '@/components/ErrorAlert';
import { useGetCategories } from '@/hooks/categories/useGetCategories';
import { fuzzyFilterFn } from '@/lib/dataTable';
import { TagsIcon } from 'lucide-react';

const EmptyUserCategories = () => {
  return (
    <div className="flex flex-col gap-4 h-full items-center justify-center">
      <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
        <TagsIcon size={40} className="stroke-primary" />
      </div>
      <div className="flex flex-col gap-1 text-center">
        <p className="font-bold">No transactions added yet</p>
        <p className="text-muted-foreground">
          Click the button below to add your first transaction
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
      columns={columns}
      data={categories}
      config={{
        filters: {
          search: {
            filterFn: fuzzyFilterFn(['name']),
            placeholder: 'Search categories...',
          },
        },
      }}
    />
  );
};
