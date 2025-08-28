import { PageHeader } from "@/components/PageHeader";

const MonthlyPage = async () => {
  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex justify-between">
        <PageHeader
          description="You monthly overview"
          title="Monthly Analytics"
        />
      </div>
    </div>
  );
};

export default MonthlyPage;
