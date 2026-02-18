export const ROUTES = {
  home: "/",

  transactions: "/transactions",
  transaction: (id: string) => `/transactions/${id}` as const,
  importTransactions: "/transactions/import",

  categories: "/categories",
  category: (id: string) => `/categories/${id}` as const,

  analytics: {
    monthly: "/analytics/monthly",
    yearly: "/analytics/yearly",
  },

  etl: {
    categories: "/etl/categories",
  },

  settings: "/settings",
} as const;
