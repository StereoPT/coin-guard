"use client";

import type { ProcessedTransaction } from "@/actions/transactions/parseTransaction";
import { EditableDataTable } from "@/components/dataTable/EditableDataTable";
import { editableColumns } from "@/components/transactions/editableColumns";
import { Button } from "@/components/ui/button";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";
import { ROUTES } from "@/constants/routes";
import { useImportTransaction } from "@/hooks/transactions/useImportTransaction";
import { useParseTransaction } from "@/hooks/transactions/useParseTransaction";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const ImportTransactions = () => {
  const router = useRouter();

  const [files, setFiles] = useState<File[] | undefined>();
  const [transactions, setTransactions] = useState<
    ProcessedTransaction[] | undefined
  >();

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
        onError={console.error}
        src={files}
      >
        <DropzoneEmptyState />
        <DropzoneContent />
      </Dropzone>
      <div>
        <EditableDataTable
          columns={editableColumns}
          data={transactions ?? []}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button asChild variant="outline">
          <Link href={ROUTES.transactions}>Back</Link>
        </Button>
        <Button disabled={isPending || !transactions} onClick={handleImport}>
          Import
        </Button>
      </div>
    </div>
  );
};
