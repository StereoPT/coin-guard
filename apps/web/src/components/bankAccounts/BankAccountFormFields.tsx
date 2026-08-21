"use client";

import type {
  addBankAccountSchemaType,
  editBankAccountSchemaType,
} from "@/schemas/bankAccounts";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Switch,
} from "@coin-guard/ui";
import { Controller, useFormContext } from "react-hook-form";

type BankAccountSchema = addBankAccountSchemaType | editBankAccountSchemaType;

const bankAccountTypeItems = [
  { value: "CHECKING", label: "Checking" },
  { value: "SAVINGS", label: "Savings" },
];

type BankAccountFormFieldsProps = {
  formId: string;
};

export const BankAccountFormFields = ({
  formId,
}: BankAccountFormFieldsProps) => {
  const { control } = useFormContext<BankAccountSchema>();

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

      <FieldGroup className="grid grid-cols-2 gap-4">
        <Controller
          control={control}
          name="alias"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={`${formId}-alias`}>Alias</FieldLabel>
              <Input {...field} id={`${formId}-alias`} placeholder="Alias" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={control}
          name="type"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={`${formId}-type`}>Type</FieldLabel>
              <Select
                items={bankAccountTypeItems}
                onValueChange={field.onChange}
                value={field.value ?? null}
              >
                <SelectTrigger className="w-full" id={`${formId}-type`}>
                  <SelectValue placeholder="Bank Account Type" />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false}>
                  <SelectGroup>
                    <SelectLabel>Bank Account Type</SelectLabel>
                    <SelectItem value="CHECKING">Checking</SelectItem>
                    <SelectItem value="SAVINGS">Savings</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Controller
        control={control}
        name="iban"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor={`${formId}-iban`}>IBAN</FieldLabel>
            <Input {...field} id={`${formId}-iban`} placeholder="IBAN" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        control={control}
        name="isDefault"
        render={({ field, fieldState }) => (
          <Field orientation="horizontal">
            <FieldContent>
              <FieldLabel htmlFor={`${formId}-is-default`}>
                Default account
              </FieldLabel>
              <FieldDescription>
                Pre-selected on new transactions and imports.
              </FieldDescription>
            </FieldContent>
            <Switch
              checked={field.value ?? false}
              id={`${formId}-is-default`}
              onCheckedChange={field.onChange}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
};
