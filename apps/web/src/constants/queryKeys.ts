const TRANSACTIONS = "transactions";
const CATEGORIES = "categories";
const ANALYTICS = "analytics";
const LOOKUP = "lookup";

export const KEYS = {
  analytics: [ANALYTICS],

  transactions: [TRANSACTIONS],
  transaction: (transactionId: string) => [TRANSACTIONS, transactionId],

  categories: [CATEGORIES],
  category: (categoryId: string) => [CATEGORIES, categoryId],

  monthlyAnalytics: (month: number) => [ANALYTICS, "monthly", month],
  yearlyAnalytics: (year: number) => [ANALYTICS, "yearly", year],

  lookupCategories: [LOOKUP, CATEGORIES],
  lookupDescriptions: [LOOKUP, "descriptions"],
  lookupLogs: [LOOKUP, "logs"],
};
