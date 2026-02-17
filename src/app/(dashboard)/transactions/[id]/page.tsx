import { PageHeader } from "@/components/PageHeader";
import { EditTransactionDialog } from "@/components/transactions/dialogs/EditTransactionDialog";
import { UserTransaction } from "@/components/transactions/UserTransaction";
import { getQueryClient } from "@/lib/getQueryClient";
import { getTransactionOptions } from "@/lib/queryOptions/transactions";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type TransactionDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const TransactionDetailsPage = async ({
  params,
}: TransactionDetailsPageProps) => {
  const { id } = await params;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getTransactionOptions(id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-1 flex-col h-full">
        <div className="flex justify-between">
          <PageHeader goBack title="Transaction Details" />
          <EditTransactionDialog id={id} trigger />
        </div>

        <div className="h-full py-6">
          <UserTransaction transactionId={id} />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default TransactionDetailsPage;
