import { PageHeader } from "@/components/PageHeader";
import { EditTransactionDialog } from "@/components/transactions/dialogs/EditTransactionDialog";
import { TransactionDetails } from "@/components/transactions/TransactionDetails";
import { getLastMonthRange } from "@/lib/date";
import { getQueryClient } from "@/lib/getQueryClient";
import {
  getRelatedTransactionsOptions,
  getTransactionOptions,
} from "@/lib/queryOptions/transactions";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const dynamic = "force-dynamic";

type TransactionDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const TransactionDetailsPage = async ({
  params,
}: TransactionDetailsPageProps) => {
  const { id: transactionId } = await params;

  const queryClient = getQueryClient();
  const transaction = await queryClient.fetchQuery(
    getTransactionOptions(transactionId),
  );

  if (transaction) {
    await queryClient.prefetchQuery(
      getRelatedTransactionsOptions(
        transaction.description,
        getLastMonthRange(),
      ),
    );
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-1 flex-col h-full">
        <div className="flex justify-between">
          <PageHeader goBack title="Transaction Details" />
          <EditTransactionDialog transactionId={transactionId} trigger />
        </div>

        <div className="h-full py-6">
          <TransactionDetails transactionId={transactionId} />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default TransactionDetailsPage;
