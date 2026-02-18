const TRANSACTIONS = "transactions";
const CATEGORIES = "categories";
const ANALYTICS = "analytics";

export const KEYS = {
  analytics: [ANALYTICS],

  transactions: [TRANSACTIONS],
  transaction: (id: string) => [TRANSACTIONS, id],

  categories: [CATEGORIES],
  category: (id: string) => [CATEGORIES, id],

  monthlyAnalytics: (month: number) => [ANALYTICS, "monthly", month],
  yearlyAnalytics: (year: number) => [ANALYTICS, "yearly", year],

  lookupCategories: ["lookup", CATEGORIES],
};
