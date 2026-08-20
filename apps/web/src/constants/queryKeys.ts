const TRANSACTIONS = "transactions";
const CATEGORIES = "categories";
const BANK_ACCOUNTS = "bankAccounts";
const ANALYTICS = "analytics";
const LOOKUP = "lookup";

export const KEYS = {
  analytics: [ANALYTICS],

  transactions: [TRANSACTIONS],
  transaction: (transactionId: string) => [TRANSACTIONS, transactionId],
  relatedTransactions: (description: string, from: Date, to: Date) => [
    TRANSACTIONS,
    "related",
    description,
    { from, to },
  ],

  categories: [CATEGORIES],
  category: (categoryId: string) => [CATEGORIES, categoryId],
  categoryTransactions: (categoryId: string, from: Date, to: Date) => [
    CATEGORIES,
    categoryId,
    "transactions",
    { from, to },
  ],

  bankAccounts: [BANK_ACCOUNTS],

  analyticsRange: (from: Date, to: Date) => [ANALYTICS, { from, to }],

  lookupCategories: [LOOKUP, CATEGORIES],
  lookupDescriptions: [LOOKUP, "descriptions"],
  lookupLogs: [LOOKUP, "logs"],
};
