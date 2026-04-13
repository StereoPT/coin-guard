export const ROUTES = {
  home: "/",

  transactions: "/transactions",
  transaction: (transactionId: string) =>
    `/transactions/${transactionId}` as const,
  importTransactions: "/transactions/import",

  categories: "/categories",
  category: (categoryId: string) => `/categories/${categoryId}` as const,

  analytics: {
    monthly: "/analytics/monthly",
    yearly: "/analytics/yearly",
  },

  etl: {
    categories: "/etl/categories",
  },

  settings: "/settings",
} as const;
