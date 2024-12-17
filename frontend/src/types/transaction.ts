export type TransactionType = 'credit' | 'debit';

export type Transaction = {
  id: number;
  date: Date;
  description: string;
  type: TransactionType;
  amount: number;
  balance: number;
};
