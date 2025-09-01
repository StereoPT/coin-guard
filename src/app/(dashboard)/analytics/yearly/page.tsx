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
      <div>
        <p className="font-bold pt-6">High-Level Summary:</p>
        <ul>
          <li>Total annual income vs expenses</li>
          <li>Annual net savings</li>
          <li>Average monthly spending</li>
          <li>Monthly spending trend line</li>
        </ul>
        <p className="font-bold pt-6">Category Analysis:</p>
        <ul>
          <li>Annual spending breakdown by category</li>
          <li>Seasonal spending patterns (quarterly comparisons)</li>
          <li>Category growth rates year-over-year</li>
          <li>Most/least expensive months by category</li>
        </ul>
        <p className="font-bold pt-6">Advanced Insights:</p>
        <ul>
          <li>Income growth rate</li>
          <li>Savings rate percentage</li>
          <li>Expense volatility (how much monthly spending varies)</li>
          <li>Transaction frequency trends</li>
        </ul>
      </div>
    </div>
  );
};

export default YearlyPage;
