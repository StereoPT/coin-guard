"use client";

import { LookupCategoryFormFields } from "@/components/etl/LookupCategoryFormFields";
import { FormType } from "@/constants/forms";
import { useAddLookupCategory } from "@/hooks/etl/categories/useAddLookupCategory";
import {
  addLookupCategorySchema,
  defaultLookupCategoryValues,
  type addLookupCategorySchemaType,
} from "@/schemas/lookup";
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
import { PlusCircle } from "@coin-guard/ui/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

type AddLookupCategoryDialogProps = WithTrigger;

export const AddLookupCategoryDialog = ({
  open,
  onOpenChange,
  trigger,
}: AddLookupCategoryDialogProps) => {
  const formId = "add-lookup-category";
  const [dialogOpen, setDialogOpen] = useState(open ?? false);

  const form = useForm<addLookupCategorySchemaType>({
    resolver: zodResolver(addLookupCategorySchema),
    defaultValues: defaultLookupCategoryValues,
  });

  const { mutateAsync, isPending } = useAddLookupCategory();

  const handleOnOpenChange = useCallback(
    (prevOpen: boolean) => {
      if (!trigger) {
        onOpenChange(prevOpen);
      }

      setDialogOpen(prevOpen);
    },
    [trigger, onOpenChange],
  );

  const onSubmit = useCallback(
    async (values: addLookupCategorySchemaType) => {
      await mutateAsync(values);
      form.reset();
      handleOnOpenChange(false);
    },
    [form, mutateAsync, handleOnOpenChange],
  );

  return (
    <Dialog onOpenChange={handleOnOpenChange} open={dialogOpen}>
      {trigger && (
        <DialogTrigger render={<Button />}>
          <PlusCircle />
          Add Lookup Category
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Lookup Category</DialogTitle>
          <DialogDescription>Create your lookup categories</DialogDescription>
        </DialogHeader>

        <FormProvider {...form}>
          <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
            <LookupCategoryFormFields formId={formId} formType={FormType.ADD} />
          </form>
        </FormProvider>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancel
          </DialogClose>
          <Button disabled={isPending} form={formId} type="submit">
            {isPending && <Spinner />}
            Add Lookup Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
