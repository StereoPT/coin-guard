import type { DateRange } from "@/lib/date";

const TRANSACTIONS = "transactions";
const CATEGORIES = "categories";
const BANK_ACCOUNTS = "bankAccounts";
const ANALYTICS = "analytics";
const LOOKUP = "lookup";

export const KEYS = {
  analytics: [ANALYTICS],

  transactions: [TRANSACTIONS],
  transaction: (transactionId: string) => [TRANSACTIONS, transactionId],
  relatedTransactions: (description: string, range: DateRange) => [
    TRANSACTIONS,
    "related",
    description,
    range,
  ],

  categories: [CATEGORIES],
  category: (categoryId: string) => [CATEGORIES, categoryId],
  categoryTransactions: (categoryId: string, range: DateRange) => [
    CATEGORIES,
    categoryId,
    "transactions",
    range,
  ],

  bankAccounts: [BANK_ACCOUNTS],

  analyticsRange: (range: DateRange) => [ANALYTICS, range],

  lookupCategories: [LOOKUP, CATEGORIES],
  lookupDescriptions: [LOOKUP, "descriptions"],
  lookupLogs: [LOOKUP, "logs"],
};
