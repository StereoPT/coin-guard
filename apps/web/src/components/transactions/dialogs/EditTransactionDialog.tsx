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
import { Edit } from "@coin-guard/ui/icons";
import { zodResolver } from "@hookform/resolvers/zod";
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
  const formId = "edit-transaction";
  const [dialogOpen, setDialogOpen] = useState(open ?? false);

  const { data: transaction, isPending: isLoadingTransaction } =
    useGetTransaction(transactionId);

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
      {trigger && (
        <DialogTrigger render={<Button />}>
          <Edit />
          Edit Transaction
        </DialogTrigger>
      )}
      <DialogContent className="max-w-2xl!">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
          <DialogDescription>Edit your transaction</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
            {isLoadingTransaction ? (
              <Spinner />
            ) : (
              <TransactionFormFields formId={formId} formType={FormType.EDIT} />
            )}
          </form>
        </Form>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancel
          </DialogClose>
          <Button disabled={isPending} form={formId} type="submit">
            {isPending && <Spinner />}
            Edit Transaction
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
