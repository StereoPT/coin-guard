import { GetTransaction } from "@/actions/transactions/getTransaction";
import { PageHeader } from "@/components/PageHeader";
import { EditTransactionDialog } from "@/components/transactions/EditTransactionDialog";
import { UserTransaction } from "@/components/transactions/UserTransaction";
import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type TransactionDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const TransactionDetailsPage = async ({
  params,
}: TransactionDetailsPageProps) => {
  const { id } = await params;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: KEYS.transaction(id),
    queryFn: () => GetTransaction(id),
  });

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
