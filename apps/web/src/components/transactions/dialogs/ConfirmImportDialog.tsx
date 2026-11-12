"use client";

import { ROUTES } from "@/constants/routes";
import { useImportTransaction } from "@/hooks/transactions/useImportTransaction";
import type { ProcessedTransaction } from "@coin-guard/parser";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Spinner,
} from "@coin-guard/ui";
import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";

type ConfirmImportDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  transactions: ProcessedTransaction[];
  accountId?: string;
  accountLabel?: string;
};

export const ConfirmImportDialog = ({
  open,
  setOpen,
  transactions,
  accountId,
  accountLabel,
}: ConfirmImportDialogProps) => {
  const router = useRouter();
  const { mutateAsync, isPending } = useImportTransaction();

  const transactionCount = transactions.length;

  const handleConfirm = async () => {
    if (transactionCount <= 0 || !accountId) return;

    try {
      await mutateAsync({ accountId, transactions });
      setOpen(false);
      router.push(ROUTES.transactions);
    } catch {
      setOpen(false);
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import Transactions</DialogTitle>
          <DialogDescription>
            You are about to import {transactionCount}{" "}
            {transactionCount === 1 ? "transaction" : "transactions"}
            {accountLabel ? ` into ${accountLabel}` : ""}. Do you want to
            continue?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose
            disabled={isPending}
            render={<Button variant="outline" />}
          >
            Cancel
          </DialogClose>
          <Button disabled={isPending} onClick={handleConfirm}>
            {isPending && <Spinner />}
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
