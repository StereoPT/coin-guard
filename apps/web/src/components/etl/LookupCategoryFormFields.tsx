"use client";

import { FormType } from "@/constants/forms";
import { useGetCategories } from "@/hooks/categories/useGetCategories";
import type {
  addLookupCategorySchemaType,
  editLookupCategorySchemaType,
} from "@/schemas/lookup";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  SearchableSelect,
  Switch,
} from "@coin-guard/ui";
import { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";

type LookupCategorySchema =
  | addLookupCategorySchemaType
  | editLookupCategorySchemaType;

type LookupCategoryFormFieldsProps = {
  formId: string;
  formType: FormType;
};

export const LookupCategoryFormFields = ({
  formId,
  formType,
}: LookupCategoryFormFieldsProps) => {
  const { control } = useFormContext<LookupCategorySchema>();

  const { data: categories } = useGetCategories();

  const categoryOptions = useMemo(() => {
    if (!categories) return [];

    return categories.map((category) => ({
      value: category.id,
      label: category.name,
    }));
  }, [categories]);

  return (
    <FieldGroup>
      <Controller
        control={control}
        name="categoryId"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Category</FieldLabel>
            <SearchableSelect
              disabled={formType === FormType.EDIT}
              emptyPlaceholder="No category found."
              onChange={field.onChange}
              options={categoryOptions}
              placeholder="Select a Category"
              searchPlaceholder="Search a category..."
              value={field.value}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor={`${formId}-description`}>
              Description
            </FieldLabel>
            <Input
              {...field}
              id={`${formId}-description`}
              placeholder="Description"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <FieldGroup>
        <Controller
          control={control}
          name="enabled"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} orientation="horizontal">
              <FieldContent>
                <FieldLabel htmlFor={`${formId}-enable-switch`}>
                  Enable
                </FieldLabel>
                <FieldDescription className="text-xs">
                  Enable to add this category to the transaction.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
              <Switch
                aria-invalid={fieldState.invalid}
                checked={field.value}
                id={`${formId}-enable-switch`}
                name={field.name}
                onCheckedChange={field.onChange}
              />
            </Field>
          )}
        />
      </FieldGroup>
    </FieldGroup>
  );
};
