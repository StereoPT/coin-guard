"use client";

import { AddBankAccountDialog } from "@/components/bankAccounts/dialogs/AddBankAccountDialog";
import { EmptyState } from "@/components/EmptyState";
import { LoadingState } from "@/components/LoadingState";
import { bankAccountColumns } from "@/constants/columns/bankAccountColumns";
import { useGetBankAccounts } from "@/hooks/bankAccounts/useGetBankAccounts";
import { LandmarkIcon } from "@coin-guard/ui/icons";
import { DataTable } from "@stereopt/data-table";

export const BankAccounts = () => {
  const { data: bankAccounts, isPending } = useGetBankAccounts();

  if (isPending || !bankAccounts) {
    return <LoadingState />;
  }

  if (bankAccounts.length <= 0) {
    return (
      <EmptyState
        action={<AddBankAccountDialog />}
        description="Click the button below to add a new bank account."
        icon={LandmarkIcon}
        title="No bank accounts added yet"
      />
    );
  }

  return (
    <DataTable
      columns={bankAccountColumns}
      config={{
        search: {
          filterFields: ["name", "iban"],
          placeholder: "Search bank accounts...",
        },
        filters: [{ column: "type", type: "select" }],
      }}
      data={bankAccounts}
    />
  );
};
