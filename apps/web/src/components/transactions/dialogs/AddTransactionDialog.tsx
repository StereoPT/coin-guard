"use client";

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

import { useCallback, type Dispatch, type SetStateAction } from "react";

import { TransactionFormFields } from "@/components/transactions/TransactionFormFields";
import { FormType } from "@/constants/forms";
import { useAddTransaction } from "@/hooks/transactions/useAddTransaction";
import {
  addTransactionSchema,
  type addTransactionSchemaType,
} from "@/schemas/transactions";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

type AddTransactionDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const AddTransactionDialog = ({
  open,
  setOpen,
}: AddTransactionDialogProps) => {
  const formId = "add-transaction";

  const form = useForm<addTransactionSchemaType>({
    resolver: zodResolver(addTransactionSchema),
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

  const { mutateAsync, isPending } = useAddTransaction();

  const onSubmit = useCallback(
    async (values: addTransactionSchemaType) => {
      await mutateAsync(values);
      form.reset();
      setOpen(false);
    },
    [form, mutateAsync, setOpen],
  );

  return (
    <Dialog onOpenChange={(prevOpen) => setOpen(prevOpen)} open={open}>
      <DialogContent className="max-w-2xl!">
        <DialogHeader>
          <DialogTitle>Create Transaction</DialogTitle>
          <DialogDescription>Create a new transaction</DialogDescription>
        </DialogHeader>

        <FormProvider {...form}>
          <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
            <TransactionFormFields formId={formId} formType={FormType.ADD} />
          </form>
        </FormProvider>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancel
          </DialogClose>
          <Button disabled={isPending} form={formId} type="submit">
            {isPending && <Spinner />}
            Add Transaction
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
