export const ROUTES = {
  home: "/",
  transactions: "/transactions",
  transaction: (id: string) => `/transactions/${id}` as const,
  categories: "/categories",
  category: (id: string) => `/categories/${id}` as const,
} as const;
