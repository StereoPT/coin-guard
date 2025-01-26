const TRANSACTIONS_KEY = 'transactions' as const;

const KEYS = {
  Transactions: (month: number) => [TRANSACTIONS_KEY, month] as const,
  Categories: ['categories'] as const,
};

export default KEYS;
