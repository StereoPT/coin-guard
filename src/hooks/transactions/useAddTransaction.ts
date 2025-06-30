import { AddTransaction } from '@/actions/transactions/addTransaction';
import { addTransactionToastID } from '@/schemas/transactions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useAddTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AddTransaction,
    onSuccess: () => {
      toast.success('Transaction added', { id: addTransactionToastID });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
    onError: () => {
      toast.error('Failed to add transaction', { id: addTransactionToastID });
    },
  });
};
