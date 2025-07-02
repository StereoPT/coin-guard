import { ImportTransaction } from '@/actions/transactions/importTransaction';
import { importTransactionToastID } from '@/schemas/transactions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useImportTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ImportTransaction,
    onSuccess: () => {
      toast.success('Transactions imported', { id: importTransactionToastID });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
    onError: () => {
      toast.error('Failed to import transactions', {
        id: importTransactionToastID,
      });
    },
  });
};
