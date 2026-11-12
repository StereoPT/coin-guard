"use client";

import { BankAccountAvatar } from "@/components/bankAccounts/BankAccountAvatar";
import { ROUTES } from "@/constants/routes";
import { useImportTransaction } from "@/hooks/transactions/useImportTransaction";
import type { BankAccount } from "@coin-guard/db";
import type { ProcessedTransaction } from "@coin-guard/parser";
import {
  Alert,
  AlertDescription,
  Badge,
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
import { TriangleAlert } from "@coin-guard/ui/icons";
import { format, startOfMonth } from "date-fns";
import { useRouter } from "next/navigation";
import { useMemo, type Dispatch, type SetStateAction } from "react";

type ConfirmImportDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  transactions: ProcessedTransaction[];
  accountId?: string;
  account?: BankAccount;
};

export const ConfirmImportDialog = ({
  open,
  setOpen,
  transactions,
  accountId,
  account,
}: ConfirmImportDialogProps) => {
  const router = useRouter();
  const { mutateAsync, isPending } = useImportTransaction();

  const transactionCount = transactions.length;

  const uncategorizedCount = transactions.filter(
    (transaction) => !transaction.categoryId,
  ).length;

  const months = useMemo(() => {
    const monthStarts = new Set(
      transactions.map(({ date }) => startOfMonth(date).getTime()),
    );

    return [...monthStarts]
      .sort((a, b) => a - b)
      .map((monthStart) => format(monthStart, "MMMM yyyy"));
  }, [transactions]);

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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Import Transactions</DialogTitle>
          <DialogDescription>
            Review the details below before importing.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          {account && (
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <BankAccountAvatar
                alias={account.alias}
                isDefault={account.isDefault}
                name={account.name}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">
                  {account.alias ?? account.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  Importing into this account
                </p>
              </div>
              <Badge className="capitalize" variant="outline">
                {account.type.toLocaleLowerCase()}
              </Badge>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">Transactions</p>
              <p className="mt-1 font-semibold text-2xl tabular-nums">
                {transactionCount}
              </p>
            </div>

            <div className="rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">
                {months.length === 1 ? "Month" : "Months"}
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {months.map((month) => (
                  <Badge key={month} variant="secondary">
                    {month}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {uncategorizedCount > 0 && (
            <Alert variant="warning">
              <TriangleAlert />
              <AlertDescription>
                {uncategorizedCount}{" "}
                {uncategorizedCount === 1
                  ? "transaction has"
                  : "transactions have"}{" "}
                no category.
              </AlertDescription>
            </Alert>
          )}
        </div>

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
