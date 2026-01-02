"use client";

import type { ProcessedTransaction } from "@/actions/transactions/parseTransaction";
import { Button } from "@/components/ui/button";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";
import { useParseTransaction } from "@/hooks/transactions/useParseTransaction";
import { useState } from "react";

export const ImportTransactions = () => {
  const [files, setFiles] = useState<File[] | undefined>();
  const [transactions, setTransactions] = useState<
    ProcessedTransaction[] | undefined
  >();

  const { mutateAsync } = useParseTransaction();

  const handleDrop = async (files: File[]) => {
    setFiles(files);

    if (files[0]) {
      const fileTransactions = await mutateAsync(files[0]);
      setTransactions(fileTransactions);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Dropzone
        multiple={false}
        onDrop={handleDrop}
        onError={console.error}
        src={files}
      >
        <DropzoneEmptyState />
        <DropzoneContent />
      </Dropzone>
      <div>
        {transactions && <pre>{JSON.stringify(transactions, null, 2)}</pre>}
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Import</Button>
      </div>
    </div>
  );
};
