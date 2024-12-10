export type Transaction = {
  id: number;
  date: Date;
  description: string;
  debit?: number;
  credit?: number;
  balance: number;
};
