import { PageHeader } from '@/components/PageHeader';
import { EditTransactionDialog } from '@/components/transactions/EditTransactionDialog';
import { UserTransaction } from '@/components/transactions/UserTransaction';

type TransactionDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const TransactionDetailsPage = async ({
  params,
}: TransactionDetailsPageProps) => {
  const { id } = await params;

  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex justify-between">
        <PageHeader title="Transaction Details" goBack />
        <EditTransactionDialog trigger id={id} />
      </div>

      <div className="h-full py-6">
        <UserTransaction transactionId={id} />
      </div>
    </div>
  );
};

export default TransactionDetailsPage;
