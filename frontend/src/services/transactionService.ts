import { fetcher, FetcherOptions } from '@/lib/fetcher';
import { TRANSACTIONS_URL } from '@/constants/api-routes';
import { Transaction } from '@/types/transaction';
import qs from 'qs';

type GetTransactionsType = {
  month?: number;
};

export const getTransactions = (
  transactionQuery?: GetTransactionsType,
  options?: FetcherOptions,
) => {
  const queryParams = qs.stringify(transactionQuery);

  return fetcher<Transaction[]>(`${TRANSACTIONS_URL}?${queryParams}`, options);
};
