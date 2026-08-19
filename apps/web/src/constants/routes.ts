export const ROUTES = {
  home: "/",

  transactions: "/transactions",
  transaction: (transactionId: string) =>
    `/transactions/${transactionId}` as const,
  importTransactions: "/transactions/import",

  categories: "/categories",
  category: (categoryId: string) => `/categories/${categoryId}` as const,

  bankAccounts: "/bank-accounts",

  analytics: "/analytics",

  etl: {
    categories: "/etl/categories",
    descriptions: "/etl/descriptions",
    logs: "/etl/logs",
  },

  settings: "/settings",
} as const;
