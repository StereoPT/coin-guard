import { ErrorAlert } from "@/components/ErrorAlert";
import { TransactionFormFields } from "@/components/transactions/forms/TransactionFormFields";
import { FormType } from "@/constants/forms";
import { useEditTransaction } from "@/hooks/transactions/useEditTransaction";
import { useGetTransaction } from "@/hooks/transactions/useGetTransaction";
import {
  editTransactionSchema,
  type editTransactionSchemaType,
} from "@/schemas/transactions";
import {
  Button,
  DialogClose,
  DialogFooter,
  Form,
  Spinner,
} from "@coin-guard/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

type EditTransactionFormProps = {
  setOpen: (prevOpen: boolean) => void;
  transactionId: string;
};

export const EditTransactionForm = ({
  setOpen,
  transactionId,
}: EditTransactionFormProps) => {
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

  const onSubmit = useCallback(
    async (values: editTransactionSchemaType) => {
      await mutateAsync(values);
      form.reset();
      setOpen(false);
    },
    [form, mutateAsync, setOpen],
  );

  if (isLoadingTransaction) {
    return <Spinner />;
  }

  if (isErrorTransaction || !transaction) {
    return <ErrorAlert />;
  }

  return (
    <Form {...form}>
      <form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <TransactionFormFields
          formId="edit-transaction"
          formType={FormType.EDIT}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button disabled={isPending} type="submit">
            {isPending && <Spinner />}
            Edit Transaction
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
