import { PageHeader } from "@/components/PageHeader";

const YearlyPage = async () => {
  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex justify-between">
        <PageHeader
          description="Your yearly overview"
          title="Yearly Analytics"
        />
      </div>
    </div>
  );
};

export default YearlyPage;
