"use client";

import { EditableDataTable } from "@/components/editableDataTable/EditableDataTable";
import { editableTransactionColumns } from "@/constants/columns/editableTransactionColumns";
import { ROUTES } from "@/constants/routes";
import { useImportTransaction } from "@/hooks/transactions/useImportTransaction";
import { useParseTransaction } from "@/hooks/transactions/useParseTransaction";
import { processedTransactionsAtom } from "@/store/transactionsStore";
import {
  Button,
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
  Spinner,
} from "@coin-guard/ui";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const ImportTransactions = () => {
  const router = useRouter();

  const [files, setFiles] = useState<File[] | undefined>();
  const [transactions, setTransactions] = useAtom(processedTransactionsAtom);

  const { mutateAsync: mutateParse, isPending: parseIsPending } =
    useParseTransaction();
  const { mutateAsync: mutateImport, isPending: importIsPending } =
    useImportTransaction();

  const handleDrop = async (files: File[]) => {
    setFiles(files);

    if (files[0]) {
      const fileTransactions = await mutateParse(files[0]);
      setTransactions(fileTransactions);
    }
  };

  const handleImport = async () => {
    if (transactions) {
      await mutateImport(transactions);
      router.push(ROUTES.transactions);
    }
  };

  const isPending = parseIsPending || importIsPending;

  return (
    <div className="flex flex-col gap-4">
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

      <EditableDataTable
        columns={editableTransactionColumns}
        data={transactions ?? []}
      />

      <div className="flex justify-end gap-2">
        <Button
          render={<Link href={ROUTES.transactions} />}
          nativeButton={false}
          variant="outline"
        >
          Back
        </Button>
        <Button
          disabled={isPending || transactions.length <= 0}
          onClick={handleImport}
        >
          {isPending && <Spinner />}
          Import
        </Button>
      </div>
    </div>
  );
};
