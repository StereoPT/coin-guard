"use client";

import { FormType } from "@/constants/forms";
import { useGetCategories } from "@/hooks/categories/useGetCategories";
import type {
  addTransactionSchemaType,
  editTransactionSchemaType,
} from "@/schemas/transactions";
import {
  Button,
  Calendar,
  cn,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SearchableSelect,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@coin-guard/ui";
import { CalendarIcon } from "@coin-guard/ui/icons";
import { format } from "date-fns";
import { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";

type TransactionSchema = addTransactionSchemaType | editTransactionSchemaType;

const transactionTypeItems = [
  { value: "DEBIT", label: "Debit" },
  { value: "CREDIT", label: "Credit" },
];

type TransactionFormFieldsProps = {
  formId: string;
  formType: FormType;
};

export const TransactionFormFields = ({
  formId,
  formType,
}: TransactionFormFieldsProps) => {
  const { data: categories } = useGetCategories();
  const { control } = useFormContext<TransactionSchema>();

  const categoryOptions = useMemo(() => {
    if (!categories) return [];

    return categories.map((category) => ({
      value: category.id,
      label: category.name,
    }));
  }, [categories]);

  return (
    <FieldGroup>
      <FieldGroup className="grid grid-cols-2 gap-4">
        <Controller
          control={control}
          name="date"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={`${formId}-date`}>Date</FieldLabel>
              <Popover>
                <PopoverTrigger
                  render={
                    <Button
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                      disabled={formType === FormType.EDIT}
                      id={`${formId}-date`}
                      variant="outline"
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Transaction date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  }
                />
                <PopoverContent align="center" className="w-auto p-0">
                  <Calendar
                    captionLayout="dropdown"
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    mode="single"
                    onSelect={field.onChange}
                    selected={field.value}
                  />
                </PopoverContent>
              </Popover>
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
                items={transactionTypeItems}
                onValueChange={field.onChange}
                value={field.value ?? null}
              >
                <SelectTrigger
                  className="w-full"
                  disabled={formType === "edit"}
                  id={`${formId}-type`}
                >
                  <SelectValue placeholder="Transaction Type" />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false}>
                  <SelectGroup>
                    <SelectLabel>Transaction Type</SelectLabel>
                    <SelectItem value="DEBIT">Debit</SelectItem>
                    <SelectItem value="CREDIT">Credit</SelectItem>
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

      <FieldGroup className="grid grid-cols-3 gap-4">
        <Controller
          control={control}
          name="amount"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={`${formId}-amount`}>Amount</FieldLabel>
              <Input
                {...field}
                id={`${formId}-amount`}
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                placeholder="Amount"
                type="number"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={control}
          name="balance"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={`${formId}-balance`}>Balance</FieldLabel>
              <Input
                {...field}
                id={`${formId}-balance`}
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                placeholder="Balance"
                type="number"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={control}
          name="categoryId"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={`${formId}-category`}>Category</FieldLabel>
              <SearchableSelect
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
      </FieldGroup>

      <Controller
        control={control}
        name="note"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor={`${formId}-note`}>Notes</FieldLabel>
            <Textarea
              {...field}
              className="h-32"
              id={`${formId}-note`}
              placeholder="Notes"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
};
