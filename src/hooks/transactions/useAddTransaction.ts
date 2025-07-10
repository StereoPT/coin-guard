import { AddTransaction } from '@/actions/transactions/addTransaction';
import { addTransactionSchemaType } from '@/schemas/transactions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useAddTransaction = () => {
  const queryClient = useQueryClient();
  const toastId = 'add-transaction';

  return useMutation({
    mutationFn: (data: addTransactionSchemaType) => {
      toast.loading('Creating transaction...', { id: toastId });
      return AddTransaction(data);
    },
    onSuccess: () => {
      toast.success('Transaction added', { id: toastId });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
    onError: () => {
      toast.error('Failed to add transaction', { id: toastId });
    },
  });
};
