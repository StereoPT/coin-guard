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
  Form,
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
import { useForm } from "react-hook-form";

type AddTransactionDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const AddTransactionDialog = ({
  open,
  setOpen,
}: AddTransactionDialogProps) => {
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogContent className="max-w-2xl!">
            <DialogHeader>
              <DialogTitle>Create Transaction</DialogTitle>
              <DialogDescription>Create a new transaction</DialogDescription>
            </DialogHeader>

            <TransactionFormFields
              formId="add-transaction"
              formType={FormType.ADD}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button disabled={isPending} type="submit">
                {isPending && <Spinner />}
                Add Transaction
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
};
