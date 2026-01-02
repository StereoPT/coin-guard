import { PageHeader } from "@/components/PageHeader";
import { ImportTransactions } from "@/components/transactions/ImportTransactions";

const TransactionsImportPage = async () => {
  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex justify-between">
        <PageHeader goBack title="Import Transactions" />
      </div>

      <div className="h-full py-6">
        <ImportTransactions />
      </div>
    </div>
  );
};

export default TransactionsImportPage;
