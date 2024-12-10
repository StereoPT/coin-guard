import { fetcher, FetcherOptions } from '@/lib/fetcher';

type Transaction = {
  id: number;
  date: string;
  description: string;
  debit: string;
  credit: string;
  balance: string;
};

export const getTransactions = (options?: FetcherOptions) => {
  return fetcher<Transaction[]>('transactions', options);
};
