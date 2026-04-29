"use client";

import { FieldGroup } from "@/components/ui/field";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type {
  addCategorySchemaType,
  editCategorySchemaType,
} from "@/schemas/categories";
import { useFormContext } from "react-hook-form";

type CategorySchema = addCategorySchemaType | editCategorySchemaType;

type CategoryFormFieldsProps = {
  formId: string;
};

export const CategoryFormFields = ({ formId }: CategoryFormFieldsProps) => {
  const { control } = useFormContext<CategorySchema>();

  return (
    <FieldGroup>
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center" htmlFor={`${formId}-name`}>
              Name
            </FormLabel>
            <FormControl>
              <Input {...field} id={`${formId}-name`} placeholder="Name" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </FieldGroup>
  );
};
