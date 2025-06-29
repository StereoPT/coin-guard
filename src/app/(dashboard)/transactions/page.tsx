import { PageHeader } from '@/components/PageHeader';
import { AddTransactionDialog } from '@/components/transactions/AddTransactionDialog';
import { Suspense } from 'react';

const TransactionsPage = () => {
  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex justify-between">
        <PageHeader title="Transactions" description="Transactions overview" />
        <AddTransactionDialog />
      </div>

      <div className="h-full py-6">
        <Suspense fallback={<></>}>Transactions Table</Suspense>
      </div>
    </div>
  );
};

export default TransactionsPage;
