import { fetcher, FetcherOptions } from '@/lib/fetcher';
import { TRANSACTIONS_URL } from '@/constants/api-routes';
import { Transaction } from '@/types/transaction';

export const getTransactions = (options?: FetcherOptions) => {
  return fetcher<Transaction[]>(TRANSACTIONS_URL, options);
};
