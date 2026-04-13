"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FieldGroup } from "@/components/ui/field";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SearchableSelect } from "@/components/ui/searchable-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormType } from "@/constants/forms";
import { useGetCategories } from "@/hooks/categories/useGetCategories";
import { cn } from "@/lib/utils";
import type {
  addTransactionSchemaType,
  editTransactionSchemaType,
} from "@/schemas/transactions";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

type TransactionSchema = addTransactionSchemaType | editTransactionSchemaType;

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
        <FormField
          control={control}
          name="date"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel
                className="flex items-center"
                htmlFor={`${formId}-date`}
              >
                Date
              </FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                        disabled={formType === FormType.EDIT}
                        id={`${formId}-date`}
                        variant={"outline"}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Transaction date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-auto p-0">
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
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="type"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel
                className="flex items-center"
                htmlFor={`${formId}-type`}
              >
                Type
              </FormLabel>
              <FormControl>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl id={`${formId}-type`}>
                    <SelectTrigger
                      className="w-full"
                      disabled={formType === "edit"}
                    >
                      <SelectValue placeholder="Transaction Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="DEBIT">Debit</SelectItem>
                    <SelectItem value="CREDIT">Credit</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FieldGroup>

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

      <FieldGroup className="grid grid-cols-3 gap-4">
        <FormField
          control={control}
          name="amount"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel
                className="flex items-center"
                htmlFor={`${formId}-amount`}
              >
                Amount
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id={`${formId}-amount`}
                  placeholder="Amount"
                  type="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="balance"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel
                className="flex items-center"
                htmlFor={`${formId}-balance`}
              >
                Balance
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id={`${formId}-balance`}
                  placeholder="Balance"
                  type="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="categoryId"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel
                className="flex items-center"
                htmlFor={`${formId}-category`}
              >
                Category
              </FormLabel>
              <SearchableSelect
                emptyPlaceholer="No category found."
                onChange={field.onChange}
                options={categoryOptions}
                placeholder="Select a Category"
                searchPlaceholder="Search a category..."
                value={field.value}
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </FieldGroup>

      <FormField
        control={control}
        name="note"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center" htmlFor={`${formId}-note`}>
              Notes
            </FormLabel>
            <FormControl>
              <Textarea
                {...field}
                className="h-32"
                id={`${formId}-note`}
                placeholder="Notes"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </FieldGroup>
  );
};
