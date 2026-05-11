import { CategoryFormFields } from "@/components/categories/forms/CategoryFormFields";
import { ErrorAlert } from "@/components/ErrorAlert";
import { useEditCategory } from "@/hooks/categories/useEditCategory";
import { useGetCategory } from "@/hooks/categories/useGetCategory";
import {
  editCategorySchema,
  type editCategorySchemaType,
} from "@/schemas/categories";
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

type EditCategoryFormProps = {
  setOpen: (prevOpen: boolean) => void;
  categoryId: string;
};

export const EditCategoryForm = ({
  setOpen,
  categoryId,
}: EditCategoryFormProps) => {
  const {
    data: category,
    isPending: isLoadingCategory,
    isError: isErrorCategory,
  } = useGetCategory(categoryId);

  const form = useForm<editCategorySchemaType>({
    resolver: zodResolver(editCategorySchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (!category) return;

    form.reset({
      name: category.name,
    });
  }, [category, form]);

  const { mutateAsync, isPending } = useEditCategory(categoryId);

  const onSubmit = useCallback(
    async (values: editCategorySchemaType) => {
      await mutateAsync(values);
      form.reset();
      setOpen(false);
    },
    [form, mutateAsync, setOpen],
  );

  if (isLoadingCategory) {
    return <Spinner />;
  }

  if (isErrorCategory || !category) {
    return <ErrorAlert />;
  }

  return (
    <Form {...form}>
      <form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <CategoryFormFields formId="edit-category" />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button disabled={isPending} type="submit">
            {isPending && <Spinner />}
            Edit Category
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
