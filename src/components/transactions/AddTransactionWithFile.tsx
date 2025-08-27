import { useImportTransaction } from "@/hooks/transactions/useImportTransaction";
import {
  type importTransactionSchemaType,
  importTransactionsSchema,
} from "@/schemas/transactions";
import { Button } from "@/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Loader2Icon } from "lucide-react";
import { type Dispatch, type SetStateAction, useCallback } from "react";
import { useForm } from "react-hook-form";

type AddTransactionWithFileProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const AddTransactionWithFile = ({
  setOpen,
}: AddTransactionWithFileProps) => {
  const form = useForm<importTransactionSchemaType>({
    resolver: zodResolver(importTransactionsSchema),
  });
  const selectedFile = form.watch("file")?.[0];

  const { mutateAsync, isPending } = useImportTransaction();

  const onSubmit = useCallback(
    async (values: importTransactionSchemaType) => {
      const file = values.file[0];

      if (file) {
        await mutateAsync(file);

        form.reset();
        setOpen(false);
      }
    },
    [form, mutateAsync, setOpen],
  );

  return (
    <Form {...form}>
      <form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="file"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel className="flex items-center">File</FormLabel>
              <FormControl>
                <Input
                  accept=".csv"
                  onChange={(e) => onChange(e.target.files)}
                  placeholder="File"
                  type="file"
                  {...field}
                />
              </FormControl>
              {selectedFile && (
                <FormDescription className="flex items-center gap-2 ml-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>{selectedFile.name}</span>
                  <span>({(selectedFile.size / 1024).toFixed(1)} KB)</span>
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={isPending} type="submit">
          {!isPending && "Import"}
          {isPending && <Loader2Icon className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};
