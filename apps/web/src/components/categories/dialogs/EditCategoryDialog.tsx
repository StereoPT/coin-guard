"use client";

import { CategoryFormFields } from "@/components/categories/CategoryFormFields";
import { useEditCategory } from "@/hooks/categories/useEditCategory";
import { useGetCategory } from "@/hooks/categories/useGetCategory";
import {
  editCategorySchema,
  type editCategorySchemaType,
} from "@/schemas/categories";
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
  Form,
  Spinner,
} from "@coin-guard/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";

type EditCategoryDialogProps = {
  categoryId: string;
} & (
  | {
      trigger: true;
      open?: boolean;
      onOpenChange?: Dispatch<SetStateAction<boolean>>;
    }
  | {
      trigger?: never;
      open: boolean;
      onOpenChange: Dispatch<SetStateAction<boolean>>;
    }
);

export const EditCategoryDialog = ({
  open,
  onOpenChange,
  trigger,
  categoryId,
}: EditCategoryDialogProps) => {
  const formId = "edit-category";
  const [dialogOpen, setDialogOpen] = useState(open ?? false);

  const { data: category, isPending: isLoadingCategory } =
    useGetCategory(categoryId);

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

  const handleOpenChange = useCallback(
    (prevOpen: boolean) => {
      if (!trigger) {
        onOpenChange(prevOpen);
      }

      setDialogOpen(prevOpen);
    },
    [trigger, onOpenChange],
  );

  const onSubmit = useCallback(
    async (values: editCategorySchemaType) => {
      await mutateAsync(values);
      form.reset();
      handleOpenChange(false);
    },
    [form, mutateAsync, handleOpenChange],
  );

  return (
    <Dialog onOpenChange={handleOpenChange} open={dialogOpen}>
      {trigger && (
        <DialogTrigger asChild>
          <Button>
            <Edit />
            Edit Category
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>Edit your category details</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
            {isLoadingCategory ? (
              <Spinner />
            ) : (
              <CategoryFormFields formId={formId} />
            )}
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button disabled={isPending} form={formId} type="submit">
            {isPending && <Spinner />}
            Edit Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
