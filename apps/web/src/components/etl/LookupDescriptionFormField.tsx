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

      <Controller
        control={control}
        name="newDescription"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor={`${formId}-new-description`}>
              New Description
            </FieldLabel>
            <Input
              {...field}
              id={`${formId}-new-description`}
              placeholder="New Description"
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
