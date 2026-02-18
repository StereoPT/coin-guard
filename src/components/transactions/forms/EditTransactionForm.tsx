import { Spinner } from "@/components/ui/spinner";
import { useGetCategories } from "@/hooks/categories/useGetCategories";
import { useEditTransaction } from "@/hooks/transactions/useEditTransaction";
import { cn } from "@/lib/utils";
import {
  editTransactionSchema,
  type editTransactionSchemaType,
} from "@/schemas/transactions";
import type { TransactionWithCategory } from "@/types/transactions";
import { Button } from "@/ui/button";
import { Calendar } from "@/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { SearchableSelect } from "@/ui/searchable-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Textarea } from "@/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";

type EditTransactionFormProps = {
  setOpen: (prevOpen: boolean) => void;
  initialValues: TransactionWithCategory;
};

export const EditTransactionForm = ({
  setOpen,
  initialValues,
}: EditTransactionFormProps) => {
  const { data: categories } = useGetCategories();

  const form = useForm<editTransactionSchemaType>({
    resolver: zodResolver(editTransactionSchema),
    defaultValues: {
      ...initialValues,
      note: initialValues.note ?? "",
      categoryId: initialValues.categoryId ?? undefined,
    },
  });

  const { mutateAsync, isPending } = useEditTransaction(initialValues.id);

  const categoryOptions = useMemo(() => {
    if (!categories) return [];

    return categories.map((category) => ({
      value: category.id,
      label: category.name,
    }));
  }, [categories]);

  const onSubmit = useCallback(
    async (values: editTransactionSchemaType) => {
      await mutateAsync(values);
      form.reset();
      setOpen(false);
    },
    [form, mutateAsync, setOpen],
  );

  return (
    <Form {...form}>
      <form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-row gap-2 w-full">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="flex items-center">Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                          disabled
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
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="flex items-center">Type</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full" disabled>
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
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">Description</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row gap-2 w-full">
          <FormField
            control={form.control}
            disabled
            name="amount"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="flex items-center">Amount</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Amount" type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            disabled
            name="balance"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="flex items-center">Balance</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Balance" type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="flex items-center">Category</FormLabel>
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
        </div>

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">Notes</FormLabel>
              <FormControl>
                <Textarea {...field} className="h-32" placeholder="Notes" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={isPending} type="submit">
          {!isPending && "Edit"}
          {isPending && <Spinner />}
        </Button>
      </form>
    </Form>
  );
};
