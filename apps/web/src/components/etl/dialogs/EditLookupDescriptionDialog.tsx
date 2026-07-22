"use client";

import { LookupDescriptionFormField } from "@/components/etl/LookupDescriptionFormField";
import { useEditLookupDescription } from "@/hooks/etl/descriptions/useEditLookupDescription";
import {
  editLookupDescriptionSchema,
  type editLookupDescriptionSchemaType,
} from "@/schemas/lookup";
import type { LookupDescription } from "@coin-guard/db";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  Spinner,
} from "@coin-guard/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";

type EditLookupDescriptionDialogProps = {
  lookupDescription: LookupDescription;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  open: boolean;
};

export const EditLookupDescriptionDialog = ({
  lookupDescription,
  onOpenChange,
  open,
}: EditLookupDescriptionDialogProps) => {
  const formId = "edit-lookup-description";

  const form = useForm<editLookupDescriptionSchemaType>({
    resolver: zodResolver(editLookupDescriptionSchema),
    defaultValues: {
      ...lookupDescription,
    },
  });

  const { mutateAsync, isPending } = useEditLookupDescription(
    lookupDescription.id,
  );

  const onSubmit = useCallback(
    async (values: editLookupDescriptionSchemaType) => {
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
          <DialogTitle>Edit Lookup Description</DialogTitle>
          <DialogDescription>Edit your lookup description</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
            <LookupDescriptionFormField formId={formId} />
          </form>
        </Form>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancel
          </DialogClose>

          <Button disabled={isPending} form={formId} type="submit">
            {isPending && <Spinner />}
            Edit Lookup Description
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
