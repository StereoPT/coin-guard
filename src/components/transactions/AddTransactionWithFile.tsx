import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useImportTransaction } from '@/hooks/transactions/useImportTransaction';
import {
  importTransactionSchemaType,
  importTransactionsSchema,
  importTransactionToastID,
} from '@/schemas/transactions';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type AddTransactionWithFileProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const AddTransactionWithFile = ({
  setOpen,
}: AddTransactionWithFileProps) => {
  const form = useForm<importTransactionSchemaType>({
    resolver: zodResolver(importTransactionsSchema),
  });
  const fileRef = form.register('file');

  const { mutateAsync, isPending } = useImportTransaction();

  const onSubmit = useCallback(
    async (values: importTransactionSchemaType) => {
      toast.loading('Importing transaction...', {
        id: importTransactionToastID,
      });
      await mutateAsync(values);
      form.reset();
      setOpen(false);
    },
    [form, mutateAsync, setOpen],
  );

  return (
    <Form {...form}>
      <form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="file"
          render={() => (
            <FormItem>
              <FormLabel className="flex items-center">File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".csv"
                  placeholder="File"
                  {...fileRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {!isPending && 'Import'}
          {isPending && <Loader2Icon className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};
