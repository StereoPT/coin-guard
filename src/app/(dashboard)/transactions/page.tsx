import { PageHeader } from '@/components/PageHeader';
import { AddTransactionDialog } from '@/components/transactions/AddTransactionDialog';
import { UserTransactions } from '@/components/transactions/UserTransactions';

const TransactionsPage = async () => {
  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex justify-between">
        <PageHeader title="Transactions" description="Transactions overview" />
        <AddTransactionDialog />
      </div>

      <div className="h-full py-6">
        <UserTransactions />
      </div>
    </div>
  );
};

export default TransactionsPage;
