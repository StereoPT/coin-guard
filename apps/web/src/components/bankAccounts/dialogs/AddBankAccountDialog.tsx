"use client";

import { BankAccountFormFields } from "@/components/bankAccounts/BankAccountFormFields";
import { useAddBankAccount } from "@/hooks/bankAccounts/useAddBankAccount";
import {
  addBankAccountSchema,
  type addBankAccountSchemaType,
} from "@/schemas/bankAccounts";
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
  Spinner,
} from "@coin-guard/ui";
import { PlusCircle } from "@coin-guard/ui/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const AddBankAccountDialog = () => {
  const formId = "add-bank-account";
  const [open, setOpen] = useState(false);

  const form = useForm<addBankAccountSchemaType>({
    resolver: zodResolver(addBankAccountSchema),
    defaultValues: {
      name: "",
      alias: "",
      type: undefined,
      iban: "",
      isDefault: false,
    },
  });

  const { mutateAsync, isPending } = useAddBankAccount();

  const onSubmit = useCallback(
    async (values: addBankAccountSchemaType) => {
      await mutateAsync(values);
      form.reset();
      setOpen(false);
    },
    [form, mutateAsync],
  );

  return (
    <Dialog onOpenChange={(prevOpen) => setOpen(prevOpen)} open={open}>
      <DialogTrigger render={<Button />}>
        <PlusCircle />
        Add Bank Account
      </DialogTrigger>
      <DialogContent className="max-w-lg!">
        <DialogHeader>
          <DialogTitle>Create Bank Account</DialogTitle>
          <DialogDescription>Create a new bank account</DialogDescription>
        </DialogHeader>

        <FormProvider {...form}>
          <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
            <BankAccountFormFields formId={formId} />
          </form>
        </FormProvider>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancel
          </DialogClose>
          <Button disabled={isPending} form={formId} type="submit">
            {isPending && <Spinner />}
            Add Bank Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
