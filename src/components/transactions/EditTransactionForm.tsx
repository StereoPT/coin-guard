import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useGetCategories } from '@/hooks/categories/useGetCategories';
import { useEditTransaction } from '@/hooks/transactions/useEditTransaction';
import { cn } from '@/lib/utils';
import {
  editTransactionSchema,
  editTransactionSchemaType,
} from '@/schemas/transactions';
import { TransactionWithCategory } from '@/types/transactions';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2Icon } from 'lucide-react';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

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
      note: initialValues.note ?? '',
      categoryId: initialValues.categoryId ?? undefined,
    },
  });

  const { mutateAsync, isPending } = useEditTransaction(initialValues.id);

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
                          variant={'outline'}
                          disabled
                          className={cn(
                            'pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}>
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Transaction date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        captionLayout="dropdown"
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
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
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
                  <Input {...field} type="number" placeholder="Amount" />
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
                  <Input {...field} type="number" placeholder="Balance" />
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
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
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
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">Notes</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Notes" className="h-32" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {!isPending && 'Edit'}
          {isPending && <Loader2Icon className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};
