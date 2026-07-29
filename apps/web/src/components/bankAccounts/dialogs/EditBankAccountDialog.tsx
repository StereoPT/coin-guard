"use client";

import { BankAccountFormFields } from "@/components/bankAccounts/BankAccountFormFields";
import { useEditBankAccount } from "@/hooks/bankAccounts/useEditBankAccount";
import {
  editBankAccountSchema,
  type editBankAccountSchemaType,
} from "@/schemas/bankAccounts";
import type { BankAccount } from "@coin-guard/db";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, type Dispatch, type SetStateAction } from "react";
import { FormProvider, useForm } from "react-hook-form";

type EditBankAccountDialogProps = {
  bankAccount: BankAccount;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

export const EditBankAccountDialog = ({
  bankAccount,
  open,
  onOpenChange,
}: EditBankAccountDialogProps) => {
  const formId = "edit-bank-account";

  const form = useForm<editBankAccountSchemaType>({
    resolver: zodResolver(editBankAccountSchema),
    defaultValues: {
      name: bankAccount.name,
      alias: bankAccount.alias ?? "",
      type: bankAccount.type,
      iban: bankAccount.iban,
    },
  });

  const { mutateAsync, isPending } = useEditBankAccount(bankAccount.id);

  const onSubmit = useCallback(
    async (values: editBankAccountSchemaType) => {
      await mutateAsync(values);
      form.reset();
      onOpenChange(false);
    },
    [form, mutateAsync, onOpenChange],
  );

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Bank Account</DialogTitle>
          <DialogDescription>Edit your bank account details</DialogDescription>
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
            Edit Bank Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
