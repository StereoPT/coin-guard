import { UserCategory } from '@/components/category/UserCategory';
import { PageHeader } from '@/components/PageHeader';

type CategoryDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const CategoryDetailsPage = async ({ params }: CategoryDetailsPageProps) => {
  const { id } = await params;

  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex justify-between">
        <PageHeader title="Category Details" />
      </div>
      <div className="h-full py-6">
        <UserCategory categoryId={id} />
      </div>
    </div>
  );
};

export default CategoryDetailsPage;
