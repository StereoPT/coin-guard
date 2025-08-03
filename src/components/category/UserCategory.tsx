'use client';

import { CategoryTable } from '@/components/category/CategoryTable';
import { ErrorAlert } from '@/components/ErrorAlert';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetCategory } from '@/hooks/categories/useGetCategory';

const LoadingUserCategory = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-7 w-1/2" />
      <Skeleton className="h-[800px] w-full" />
    </div>
  );
};

type UserCategoryProps = {
  categoryId: string;
};

export const UserCategory = ({ categoryId }: UserCategoryProps) => {
  const { data: category, isLoading } = useGetCategory(categoryId);

  if (isLoading) {
    return <LoadingUserCategory />;
  }

  if (!category) {
    return <ErrorAlert />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex text-xl gap-2 items-center">
        <span className="font-bold">Category: </span>
        {category.name}
      </div>
      <CategoryTable transactions={category.transactions} />
    </div>
  );
};
