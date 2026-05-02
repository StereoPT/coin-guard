import { CategoryFormFields } from "@/components/categories/forms/CategoryFormFields";
import { Spinner } from "@coin-guard/ui";
import { useAddCategory } from "@/hooks/categories/useAddCategory";
import {
  addCategorySchema,
  type addCategorySchemaType,
} from "@/schemas/categories";
import { Button } from "@coin-guard/ui";
import { Form } from "@coin-guard/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Dispatch, type SetStateAction, useCallback } from "react";
import { useForm } from "react-hook-form";

type AddCategoryFormProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const AddCategoryForm = ({ setOpen }: AddCategoryFormProps) => {
  const form = useForm<addCategorySchemaType>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutateAsync, isPending } = useAddCategory();

  const onSubmit = useCallback(
    async (values: addCategorySchemaType) => {
      await mutateAsync(values);
      form.reset();
      setOpen(false);
    },
    [form, mutateAsync, setOpen],
  );

  return (
    <Form {...form}>
      <form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <CategoryFormFields formId="add-category" />

        <Button className="w-full" disabled={isPending} type="submit">
          {isPending && <Spinner />}
          Add Category
        </Button>
      </form>
    </Form>
  );
};
