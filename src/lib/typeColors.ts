import type { TransactionType } from "@/generated/prisma";

export const getTypeColor = (type: TransactionType, isNegative?: boolean) => {
  if (type === "CREDIT") {
    if (isNegative) {
      return "text-red-600";
    }
    return "text-green-600";
  } else if (type === "DEBIT") {
    if (isNegative) {
      return "text-green-600";
    }
    return "text-red-600";
  }
};
