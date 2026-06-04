"use client";

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
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Spinner,
  Switch,
} from "@coin-guard/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, type Dispatch, type SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";

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
            <FieldGroup>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Description" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      New Description
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="New Description" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FieldGroup>
                <Controller
                  control={form.control}
                  name="enabled"
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      orientation="horizontal"
                    >
                      <FieldContent>
                        <FieldLabel htmlFor="enable-switch">Enable</FieldLabel>
                        <FieldDescription>
                          Enable to modify this description in the transaction.
                        </FieldDescription>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </FieldContent>
                      <Switch
                        aria-invalid={fieldState.invalid}
                        checked={field.value}
                        id="enable-switch"
                        name={field.name}
                        onCheckedChange={field.onChange}
                      />
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldGroup>
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
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
