const TRANSACTIONS = 'transactions';
const CATEGORIES = 'categories';

export const KEYS = {
  analytics: ['analytics'],

  transactions: [TRANSACTIONS],
  transaction: (id: string) => [TRANSACTIONS, id],

  categories: [CATEGORIES],
  category: (id: string) => [CATEGORIES, id],
};
