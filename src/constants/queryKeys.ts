const TRANSACTIONS = "transactions";
const CATEGORIES = "categories";
const ANALYTICS = "analytics";

export const KEYS = {
  analytics: [ANALYTICS],

  transactions: [TRANSACTIONS],
  transaction: (transactionId: string) => [TRANSACTIONS, transactionId],

  categories: [CATEGORIES],
  category: (categoryId: string) => [CATEGORIES, categoryId],

  monthlyAnalytics: (month: number) => [ANALYTICS, "monthly", month],
  yearlyAnalytics: (year: number) => [ANALYTICS, "yearly", year],

  lookupCategories: ["lookup", CATEGORIES],
};
