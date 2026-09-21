import type { LookupCategory } from "@coin-guard/db";

export type LookupCategoryWithCategoryName = LookupCategory & {
  categoryName: string;
};

export type CategoryStats = {
  categoryId: string;
  categoryName: string;
  totalAmount: number;
  budgetAmount: number | null;
};
