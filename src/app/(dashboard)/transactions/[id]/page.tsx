import { PageHeader } from '@/components/PageHeader';
import { UserTransaction } from '@/components/transaction/UserTransaction';

type TransactionDetailsPage = {
  params: Promise<{ id: string }>;
};

const TransactionDetailsPage = async ({ params }: TransactionDetailsPage) => {
  const { id } = await params;

  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex justify-between">
        <PageHeader title="Transaction Details" />
      </div>

      <div className="h-full py-6">
        <UserTransaction transactionId={id} />
      </div>
    </div>
  );
};

export default TransactionDetailsPage;
