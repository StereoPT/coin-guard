import { PageHeader } from "@/components/PageHeader";
import { ImportTransactions } from "@/components/transactions/ImportTransactions";
import { getQueryClient } from "@/lib/getQueryClient";
import { getCategoriesOptions } from "@/lib/queryOptions/categories";
import { ImportTransactionsProvider } from "@/store/providers/ImportTransactionsProvider";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const TransactionsImportPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getCategoriesOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ImportTransactionsProvider>
        <div className="flex flex-1 flex-col h-full">
          <div className="flex justify-between">
            <PageHeader goBack title="Import Transactions" />
          </div>

          <div className="h-full py-6">
            <ImportTransactions />
          </div>
        </div>
      </ImportTransactionsProvider>
    </HydrationBoundary>
  );
};

export default TransactionsImportPage;
