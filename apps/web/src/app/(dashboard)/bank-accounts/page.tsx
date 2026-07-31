import { BankAccounts } from "@/components/bankAccounts/BankAccounts";
import { AddBankAccountDialog } from "@/components/bankAccounts/dialogs/AddBankAccountDialog";
import { PageHeader } from "@/components/PageHeader";
import { getQueryClient } from "@/lib/getQueryClient";
import { getBankAccountsOptions } from "@/lib/queryOptions/bankAccounts";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const dynamic = "force-dynamic";

const BankAccountsPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getBankAccountsOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-1 flex-col h-full">
        <div className="flex justify-between">
          <PageHeader
            description="Bank Accounts overview"
            title="Bank Accounts"
          />
          <AddBankAccountDialog />
        </div>

        <div className="h-full py-6">
          <BankAccounts />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default BankAccountsPage;
