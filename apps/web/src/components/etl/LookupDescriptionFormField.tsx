"use client";

import type {
  addLookupDescriptionSchemaType,
  editLookupDescriptionSchemaType,
} from "@/schemas/lookup";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Switch,
} from "@coin-guard/ui";
import { Controller, useFormContext } from "react-hook-form";

type LookupDescriptionSchema =
  | addLookupDescriptionSchemaType
  | editLookupDescriptionSchemaType;

type LookupDescriptionFormFieldProps = {
  formId: string;
};

export const LookupDescriptionFormField = ({
  formId,
}: LookupDescriptionFormFieldProps) => {
  const { control } = useFormContext<LookupDescriptionSchema>();

  return (
    <FieldGroup>
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel
              className="flex items-center"
              htmlFor={`${formId}-description`}
            >
              Description
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                id={`${formId}-description`}
                placeholder="Description"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="newDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel
              className="flex items-center"
              htmlFor={`${formId}-new-description`}
            >
              New Description
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                id={`${formId}-new-description`}
                placeholder="New Description"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
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
