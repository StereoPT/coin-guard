'use client';

import { CategoryChart } from '@/components/categories/CategoryChart';
import { CategoryTable } from '@/components/categories/CategoryTable';
import { ErrorAlert } from '@/components/ErrorAlert';
import { useGetCategory } from '@/hooks/categories/useGetCategory';

type UserCategoryProps = {
  categoryId: string;
};

export const UserCategory = ({ categoryId }: UserCategoryProps) => {
  const { data: category } = useGetCategory(categoryId);

  if (!category) {
    return <ErrorAlert />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex text-xl gap-2 items-center">
        <span className="font-bold">Category: </span>
        {category.name}
      </div>
      <CategoryChart transactions={category.transactions} />
      <CategoryTable transactions={category.transactions} />
    </div>
  );
};
