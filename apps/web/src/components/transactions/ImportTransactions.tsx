"use client";

import { EditableDataTable } from "@/components/editableDataTable/EditableDataTable";
import { editableTransactionColumns } from "@/constants/columns/editableTransactionColumns";
import { ROUTES } from "@/constants/routes";
import { useGetBankAccounts } from "@/hooks/bankAccounts/useGetBankAccounts";
import { useImportTransaction } from "@/hooks/transactions/useImportTransaction";
import { useParseTransaction } from "@/hooks/transactions/useParseTransaction";
import { processedTransactionsAtom } from "@/store/transactionsStore";
import {
  Badge,
  Button,
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
  FieldLabel,
  SearchableSelect,
  Spinner,
} from "@coin-guard/ui";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export const ImportTransactions = () => {
  const router = useRouter();

  const [files, setFiles] = useState<File[] | undefined>();
  const [accountId, setAccountId] = useState<string | undefined>();
  const [transactions, setTransactions] = useAtom(processedTransactionsAtom);

  const { data: bankAccounts } = useGetBankAccounts();

  const { mutateAsync: mutateParse, isPending: parseIsPending } =
    useParseTransaction();
  const { mutateAsync: mutateImport, isPending: importIsPending } =
    useImportTransaction();

  const bankAccountOptions = useMemo(() => {
    if (!bankAccounts) return [];

    return bankAccounts.map((bankAccount) => {
      const label = bankAccount.alias ?? bankAccount.name;

      return {
        value: bankAccount.id,
        label: `${label} (${bankAccount.type})`,
        content: (
          <span className="flex items-center gap-2">
            {label}
            <Badge className="capitalize" variant="outline">
              {bankAccount.type.toLocaleLowerCase()}
            </Badge>
          </span>
        ),
      };
    });
  }, [bankAccounts]);

  const handleDrop = async (files: File[]) => {
    setFiles(files);

    if (files[0]) {
      const fileTransactions = await mutateParse(files[0]);
      setTransactions(fileTransactions);
    }
  };

  const handleImport = async () => {
    if (transactions.length > 0 && accountId) {
      await mutateImport(
        transactions.map((transaction) => ({ ...transaction, accountId })),
      );
      router.push(ROUTES.transactions);
    }
  };

  const isPending = parseIsPending || importIsPending;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 rounded-lg border p-4">
        <div className="flex items-center gap-4">
          <FieldLabel className="shrink-0" htmlFor="import-account">
            Bank Account
          </FieldLabel>
          <div className="min-w-0 flex-1">
            <SearchableSelect
              align="start"
              emptyPlaceholder="No bank account found."
              onChange={setAccountId}
              options={bankAccountOptions}
              placeholder="Select a Bank Account"
              searchPlaceholder="Search a bank account..."
              value={accountId}
            />
          </div>
        </div>

        <Dropzone
          accept={{ "text/csv": [] }}
          disabled={isPending}
          multiple={false}
          onDrop={handleDrop}
          src={files}
        >
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>
      </div>

      <EditableDataTable
        columns={editableTransactionColumns}
        data={transactions ?? []}
      />

      <div className="flex justify-end gap-2">
        <Button
          nativeButton={false}
          render={<Link href={ROUTES.transactions} />}
          variant="outline"
        >
          Back
        </Button>
        <Button
          disabled={isPending || transactions.length <= 0 || !accountId}
          onClick={handleImport}
        >
          {isPending && <Spinner />}
          Import
        </Button>
      </div>
    </div>
  );
};
