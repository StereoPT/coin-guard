import { AddCategoryDialog } from '@/components/categories/AddCategoryDialog';
import { UserCategories } from '@/components/categories/UserCategories';
import { PageHeader } from '@/components/PageHeader';

const CategoriesPage = async () => {
  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex justify-between">
        <PageHeader title="Categories" description="Categories overview" />
        <AddCategoryDialog />
      </div>

      <div className="h-full py-6">
        <UserCategories />
      </div>
    </div>
  );
};

export default CategoriesPage;
