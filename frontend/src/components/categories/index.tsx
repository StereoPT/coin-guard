'use client';

import { useCategories } from '@/hooks/useCategories';

export const Categories = () => {
  const { data: categories } = useCategories();

  // XXX: Loading Here?
  if (!categories) return null;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
      {JSON.stringify(categories)}
    </div>
  );
};
