import { TransactionFormFields } from "@/components/transactions/forms/TransactionFormFields";
import { Spinner } from "@coin-guard/ui";
import { FormType } from "@/constants/forms";
import { useAddTransaction } from "@/hooks/transactions/useAddTransaction";
import {
  addTransactionSchema,
  type addTransactionSchemaType,
} from "@/schemas/transactions";
import { Button } from "@coin-guard/ui";
import { Form } from "@coin-guard/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Dispatch, type SetStateAction, useCallback } from "react";
import { useForm } from "react-hook-form";

type AddTransactionFormProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const AddTransactionForm = ({ setOpen }: AddTransactionFormProps) => {
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
    <Form {...form}>
      <form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <TransactionFormFields
          formId="add-transaction"
          formType={FormType.ADD}
        />

        <Button className="w-full" disabled={isPending} type="submit">
          {!isPending && "Add"}
          {isPending && <Spinner />}
        </Button>
      </form>
    </Form>
  );
};
