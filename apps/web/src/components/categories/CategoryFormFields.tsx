"use client";

import type {
  addCategorySchemaType,
  editCategorySchemaType,
} from "@/schemas/categories";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
} from "@coin-guard/ui";
import { Controller, useFormContext } from "react-hook-form";

type CategorySchema = addCategorySchemaType | editCategorySchemaType;

type CategoryFormFieldsProps = {
  formId: string;
};

export const CategoryFormFields = ({ formId }: CategoryFormFieldsProps) => {
  const { control } = useFormContext<CategorySchema>();

  return (
    <FieldGroup>
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor={`${formId}-name`}>Name</FieldLabel>
            <Input {...field} id={`${formId}-name`} placeholder="Name" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
};
