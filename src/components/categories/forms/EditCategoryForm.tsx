import { CategoryFormFields } from "@/components/categories/forms/CategoryFormFields";
import { Spinner } from "@/components/ui/spinner";
import type { Category } from "@/generated/prisma/client";
import { useEditCategory } from "@/hooks/categories/useEditCategory";
import {
  editCategorySchema,
  type editCategorySchemaType,
} from "@/schemas/categories";
import { Button } from "@/ui/button";
import { Form } from "@/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

type EditCategoryFormProps = {
  setOpen: (prevOpen: boolean) => void;
  initialValues: Category;
};

export const EditCategoryForm = ({
  setOpen,
  initialValues,
}: EditCategoryFormProps) => {
  const form = useForm<editCategorySchemaType>({
    resolver: zodResolver(editCategorySchema),
    defaultValues: initialValues,
  });

  const { mutateAsync, isPending } = useEditCategory(initialValues.id);

  const onSubmit = useCallback(
    async (values: editCategorySchemaType) => {
      await mutateAsync(values);
      form.reset();
      setOpen(false);
    },
    [form, mutateAsync, setOpen],
  );

  return (
    <Form {...form}>
      <form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <CategoryFormFields formId="edit-category" />

        <Button className="w-full" disabled={isPending} type="submit">
          {!isPending && "Edit"}
          {isPending && <Spinner />}
        </Button>
      </form>
    </Form>
  );
};
