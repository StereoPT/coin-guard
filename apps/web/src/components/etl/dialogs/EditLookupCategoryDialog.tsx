"use client";

import { LookupCategoryFormFields } from "@/components/etl/LookupCategoryFormFields";
import { useEditLookupCategory } from "@/hooks/etl/categories/useEditLookupCategory";
import {
  defaultLookupCategoryValues,
  editLookupCategorySchema,
  type editLookupCategorySchemaType,
} from "@/schemas/lookup";
import type { LookupCategoryWithCategoryName } from "@/types/categories";
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

type EditLookupCategoryDialogProps = {
  lookupCategory: LookupCategoryWithCategoryName;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

export const EditLookupCategoryDialog = ({
  lookupCategory,
  open,
  onOpenChange,
}: EditLookupCategoryDialogProps) => {
  const formId = "edit-lookup-category";

  const form = useForm<editLookupCategorySchemaType>({
    resolver: zodResolver(editLookupCategorySchema),
    defaultValues: defaultLookupCategoryValues,
    values: {
      description: lookupCategory.description,
      categoryId: lookupCategory.categoryId,
      enabled: lookupCategory.enabled,
    },
    resetOptions: { keepDirtyValues: true },
  });

  const { mutateAsync, isPending } = useEditLookupCategory(lookupCategory.id);

  const onSubmit = useCallback(
    async (values: editLookupCategorySchemaType) => {
      await mutateAsync(values);
      onOpenChange(false);
    },
    [mutateAsync, onOpenChange],
  );

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Lookup Category</DialogTitle>
          <DialogDescription>Edit your lookup category</DialogDescription>
        </DialogHeader>

        <FormProvider {...form}>
          <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
            <LookupCategoryFormFields formId={formId} />
          </form>
        </FormProvider>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancel
          </DialogClose>
          <Button disabled={isPending} form={formId} type="submit">
            {isPending && <Spinner />}
            Edit Lookup Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
