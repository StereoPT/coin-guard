import { PageHeader } from "@/components/PageHeader";

const LookupDescriptionsPage = async () => {
  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex justify-between">
        <PageHeader
          description="Enhance your data with descriptions"
          title="Lookup Descriptions"
        />
      </div>
      <div className="h-full py-6">Lookup Descriptions Page</div>
    </div>
  );
};

export default LookupDescriptionsPage;
