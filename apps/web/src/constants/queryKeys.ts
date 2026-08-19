const TRANSACTIONS = "transactions";
const CATEGORIES = "categories";
const BANK_ACCOUNTS = "bankAccounts";
const ANALYTICS = "analytics";
const LOOKUP = "lookup";

export const KEYS = {
  analytics: [ANALYTICS],

  transactions: [TRANSACTIONS],
  transaction: (transactionId: string) => [TRANSACTIONS, transactionId],

  categories: [CATEGORIES],
  category: (categoryId: string) => [CATEGORIES, categoryId],

  bankAccounts: [BANK_ACCOUNTS],

  yearlyAnalytics: (year: number) => [ANALYTICS, "yearly", year],
  analyticsRange: (from: Date, to: Date) => [ANALYTICS, { from, to }],

  lookupCategories: [LOOKUP, CATEGORIES],
  lookupDescriptions: [LOOKUP, "descriptions"],
  lookupLogs: [LOOKUP, "logs"],
};
