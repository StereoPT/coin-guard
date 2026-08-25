"use client";

import { CategoryFormFields } from "@/components/categories/CategoryFormFields";
import { LoadingState } from "@/components/LoadingState";
import { useEditCategory } from "@/hooks/categories/useEditCategory";
import { useGetCategory } from "@/hooks/categories/useGetCategory";
import {
  defaultCategoryValues,
  editCategorySchema,
  type editCategorySchemaType,
} from "@/schemas/categories";
import type { WithTrigger } from "@/types/dialogs";
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
import { Edit } from "@coin-guard/ui/icons";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

type EditCategoryDialogProps = {
  categoryId: string;
} & WithTrigger;

export const EditCategoryDialog = ({
  open,
  onOpenChange,
  trigger,
  triggerVariant = "default",
  triggerLabel = "Edit Category",
  triggerIcon = <Edit />,
  categoryId,
}: EditCategoryDialogProps) => {
  const formId = "edit-category";
  const [dialogOpen, setDialogOpen] = useState(open ?? false);

  const { data: category, isPending: isLoadingCategory } =
    useGetCategory(categoryId);

  const form = useForm<editCategorySchemaType>({
    resolver: zodResolver(editCategorySchema),
    defaultValues: defaultCategoryValues,
    values: category
      ? {
          name: category.name,
          budgetAmount: category.budgetAmount,
        }
      : undefined,
    resetOptions: { keepDirtyValues: true },
  });

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
      handleOpenChange(false);
    },
    [mutateAsync, handleOpenChange],
  );

  return (
    <Dialog onOpenChange={handleOpenChange} open={dialogOpen}>
      {trigger && (
        <DialogTrigger render={<Button variant={triggerVariant} />}>
          {triggerIcon}
          {triggerLabel}
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>Edit your category details</DialogDescription>
        </DialogHeader>

        <FormProvider {...form}>
          <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
            {isLoadingCategory ? (
              <LoadingState />
            ) : (
              <CategoryFormFields formId={formId} />
            )}
          </form>
        </FormProvider>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancel
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
