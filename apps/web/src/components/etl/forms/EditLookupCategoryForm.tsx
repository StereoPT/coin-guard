"use client";

import { useDeleteLookupCategory } from "@/hooks/etl/categories/useDeleteLookupCategory";
import { useEditLookupCategory } from "@/hooks/etl/categories/useEditLookupCategory";
import {
  editLookupCategorySchema,
  type editLookupCategorySchemaType,
} from "@/schemas/lookup";
import type { LookupCategory } from "@coin-guard/db";
import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  Input,
  Switch,
} from "@coin-guard/ui";
import { Check, Trash2 } from "@coin-guard/ui/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, type Dispatch, type SetStateAction } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

type EditLookupCategoryFormProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  initialValues: LookupCategory;
};

export const EditLookupCategoryForm = ({
  setOpen,
  initialValues,
}: EditLookupCategoryFormProps) => {
  const form = useForm<editLookupCategorySchemaType>({
    resolver: zodResolver(editLookupCategorySchema),
    defaultValues: {
      ...initialValues,
    },
  });

  const { mutateAsync: mutateAsyncEdit, isPending: isPendingEdit } =
    useEditLookupCategory(initialValues.id);
  const { mutateAsync: mutateAsyncDelete, isPending: isPendingDelete } =
    useDeleteLookupCategory(initialValues.id);

  const onSubmit = useCallback(
    async (values: editLookupCategorySchemaType) => {
      await mutateAsyncEdit(values);
      form.reset();
      setOpen(false);
    },
    [form, mutateAsyncEdit, setOpen],
  );

  const onDelete = useCallback(async () => {
    await mutateAsyncDelete();
    form.reset();
    setOpen(false);
  }, [form, mutateAsyncDelete, setOpen]);

  const isPending = isPendingEdit || isPendingDelete;

  return (
    <FormProvider {...form}>
      <form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="flex flex-row gap-2 w-full items-center">
          <Controller
            control={form.control}
            name="enabled"
            render={({ field, fieldState }) => (
              <Field className="flex-1">
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
              <Field className="w-full">
                <Input {...field} placeholder="Description" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="flex flex-row gap-2">
            <Button
              disabled={isPending}
              onClick={onDelete}
              size="icon"
              type="button"
              variant="destructive"
            >
              <Trash2 />
            </Button>
            <Button
              disabled={isPending}
              size="icon"
              type="submit"
              variant="outline"
            >
              <Check />
            </Button>
          </div>
        </FieldGroup>
      </form>
    </FormProvider>
  );
};
