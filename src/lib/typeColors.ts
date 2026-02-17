import type { TransactionType } from "@/generated/prisma/enums";

type ColorTypes = TransactionType | "CASH_FLOW";

export const getTypeColor = (type: ColorTypes, isNegative?: boolean) => {
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
  } else if (type === "CASH_FLOW") {
    return "text-blue-600";
  }
};
