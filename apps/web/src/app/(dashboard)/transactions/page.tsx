import { PageHeader } from "@/components/PageHeader";
import { AddTransaction } from "@/components/transactions/AddTransaction";
import { Transactions } from "@/components/transactions/Transactions";
import { getQueryClient } from "@/lib/getQueryClient";
import { getTransactionsOptions } from "@/lib/queryOptions/transactions";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const dynamic = "force-dynamic";

const TransactionsPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getTransactionsOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-1 flex-col h-full">
        <PageHeader
          actions={<AddTransaction />}
          description="Transactions overview"
          title="Transactions"
        />

        <div className="h-full py-6">
          <Transactions />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default TransactionsPage;
