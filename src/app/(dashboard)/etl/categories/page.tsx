import { PageHeader } from "@/components/PageHeader";

const LookupCategoriesPage = async () => {
  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex justify-between">
        <PageHeader
          description="Enhance you data with categories"
          title="Lookup Categories"
        />
      </div>
      <div className="h-full py-6">Lookup Categories Page</div>
    </div>
  );
};

export default LookupCategoriesPage;
