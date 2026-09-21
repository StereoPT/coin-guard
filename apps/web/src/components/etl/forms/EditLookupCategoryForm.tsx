"use client";

import { useEditLookupCategory } from "@/hooks/etl/categories/useEditLookupCategory";
import {
  defaultLookupCategoryValues,
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
import { Check } from "@coin-guard/ui/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, type Dispatch, type SetStateAction } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

type EditLookupCategoryFormProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  lookupCategory: LookupCategory;
};

export const EditLookupCategoryForm = ({
  setOpen,
  lookupCategory,
}: EditLookupCategoryFormProps) => {
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

  const { mutateAsync: mutateAsyncEdit, isPending } = useEditLookupCategory(
    lookupCategory.id,
  );

  const onSubmit = useCallback(
    async (values: editLookupCategorySchemaType) => {
      await mutateAsyncEdit(values);
      setOpen(false);
    },
    [mutateAsyncEdit, setOpen],
  );

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

          <Button
            disabled={isPending}
            size="icon"
            type="submit"
            variant="outline"
          >
            <Check />
          </Button>
        </FieldGroup>
      </form>
    </FormProvider>
  );
};
