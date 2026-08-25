"use client";

import { LookupDescriptionFormField } from "@/components/etl/LookupDescriptionFormField";
import { useAddLookupDescription } from "@/hooks/etl/descriptions/useAddLookupDescription";
import {
  addLookupDescriptionSchema,
  defaultLookupDescriptionValues,
  type addLookupDescriptionSchemaType,
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

type AddLookupDescriptionDialogProps = WithTrigger;

export const AddLookupDescriptionDialog = ({
  open,
  onOpenChange,
  trigger,
}: AddLookupDescriptionDialogProps) => {
  const formId = "add-lookup-description";
  const [dialogOpen, setDialogOpen] = useState(open ?? false);

  const form = useForm<addLookupDescriptionSchemaType>({
    resolver: zodResolver(addLookupDescriptionSchema),
    defaultValues: defaultLookupDescriptionValues,
  });

  const { mutateAsync, isPending } = useAddLookupDescription();

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
    async (values: addLookupDescriptionSchemaType) => {
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
          Add Lookup Description
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Lookup Description</DialogTitle>
          <DialogDescription>Create your lookup descriptions</DialogDescription>
        </DialogHeader>

        <FormProvider {...form}>
          <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
            <LookupDescriptionFormField formId={formId} />
          </form>
        </FormProvider>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancel
          </DialogClose>
          <Button disabled={isPending} form={formId} type="submit">
            {isPending && <Spinner />}
            Add Lookup Description
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
