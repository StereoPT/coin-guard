import { TransactionFormFields } from "@/components/transactions/forms/TransactionFormFields";
import { Spinner } from "@/components/ui/spinner";
import { FormType } from "@/constants/forms";
import { useEditTransaction } from "@/hooks/transactions/useEditTransaction";
import {
  editTransactionSchema,
  type editTransactionSchemaType,
} from "@/schemas/transactions";
import type { TransactionWithCategory } from "@/types/transactions";
import { Button } from "@/ui/button";
import { Form } from "@/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

type EditTransactionFormProps = {
  setOpen: (prevOpen: boolean) => void;
  initialValues: TransactionWithCategory;
};

export const EditTransactionForm = ({
  setOpen,
  initialValues,
}: EditTransactionFormProps) => {
  const form = useForm<editTransactionSchemaType>({
    resolver: zodResolver(editTransactionSchema),
    defaultValues: {
      ...initialValues,
      note: initialValues.note ?? "",
      categoryId: initialValues.categoryId ?? undefined,
    },
  });

  const { mutateAsync, isPending } = useEditTransaction(initialValues.id);

  const onSubmit = useCallback(
    async (values: editTransactionSchemaType) => {
      await mutateAsync(values);
      form.reset();
      setOpen(false);
    },
    [form, mutateAsync, setOpen],
  );

  return (
    <Form {...form}>
      <form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <TransactionFormFields
          formId="edit-transaction"
          formType={FormType.EDIT}
        />

        <Button className="w-full" disabled={isPending} type="submit">
          {!isPending && "Edit"}
          {isPending && <Spinner />}
        </Button>
      </form>
    </Form>
  );
};
