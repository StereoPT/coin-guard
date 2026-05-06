"use client";

import { ErrorAlert } from "@/components/ErrorAlert";
import { TransactionTabs } from "@/components/transactions/TransactionTabs";
import { useGetCategory } from "@/hooks/categories/useGetCategory";

type CategoryDetailsProps = {
  categoryId: string;
};

export const CategoryDetails = ({ categoryId }: CategoryDetailsProps) => {
  const { data: category } = useGetCategory(categoryId);

  if (!category) {
    return <ErrorAlert />;
  }

  return (
    <div className="flex flex-col gap-6">
      <TransactionTabs
        description="Showing category amount over time"
        title={category.name}
        transactions={category.transactions}
      />
    </div>
  );
};
