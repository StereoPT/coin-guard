"use client";

import { TransactionFormFields } from "@/components/transactions/TransactionFormFields";
import { FormType } from "@/constants/forms";
import { useEditTransaction } from "@/hooks/transactions/useEditTransaction";
import { useGetTransaction } from "@/hooks/transactions/useGetTransaction";
import {
  editTransactionSchema,
  type editTransactionSchemaType,
} from "@/schemas/transactions";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  Spinner,
} from "@coin-guard/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";

type EditTransactionDialogProps = {
  transactionId: string;
} & (
  | {
      trigger: true;
      open?: boolean;
      onOpenChange?: Dispatch<SetStateAction<boolean>>;
    }
  | {
      trigger?: never;
      open: boolean;
      onOpenChange: Dispatch<SetStateAction<boolean>>;
    }
);

export const EditTransactionDialog = ({
  open,
  onOpenChange,
  trigger,
  transactionId,
}: EditTransactionDialogProps) => {
  const [dialogOpen, setDialogOpen] = useState(open ?? false);

  const {
    data: transaction,
    isPending: isLoadingTransaction,
    isError: isErrorTransaction,
  } = useGetTransaction(transactionId);

  const form = useForm<editTransactionSchemaType>({
    resolver: zodResolver(editTransactionSchema),
    defaultValues: {
      date: undefined,
      description: "",
      type: undefined,
      amount: 0,
      balance: 0,
      note: "",
      categoryId: undefined,
    },
  });

  useEffect(() => {
    if (!transaction) return;

    const currentTransaction = transaction.transaction;
    form.reset({
      date: currentTransaction.date,
      description: currentTransaction.description,
      type: currentTransaction.type,
      amount: currentTransaction.amount,
      balance: currentTransaction.balance,
      note: currentTransaction.note ?? "",
      categoryId: currentTransaction.categoryId ?? undefined,
    });
  }, [transaction, form]);

  const { mutateAsync, isPending } = useEditTransaction(transactionId);

  const handleOpenChange = useCallback(
    (prevOpen: boolean) => {
      if (!trigger) {
        onOpenChange(prevOpen);
      }

      setDialogOpen(prevOpen);
    },
    [trigger, onOpenChange],
  );

  const onSubmit = useCallback(
    async (values: editTransactionSchemaType) => {
      await mutateAsync(values);
      form.reset();
      handleOpenChange(false);
    },
    [form, mutateAsync, handleOpenChange],
  );

  return (
    <Dialog onOpenChange={handleOpenChange} open={dialogOpen}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {trigger && (
            <DialogTrigger asChild>
              <Button>
                <Edit />
                Edit Transaction
              </Button>
            </DialogTrigger>
          )}
          <DialogContent className="max-w-2xl!">
            <DialogHeader>
              <DialogTitle>Edit Transaction</DialogTitle>
              <DialogDescription>Edit your transaction</DialogDescription>
            </DialogHeader>

            {isLoadingTransaction ? (
              <Spinner />
            ) : (
              <TransactionFormFields
                formId="edit-transaction"
                formType={FormType.EDIT}
              />
            )}

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button disabled={isPending} type="submit">
                {isPending && <Spinner />}
                Edit Transaction
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
};
