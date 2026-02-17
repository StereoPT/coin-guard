import type { TransactionType } from "@/generated/prisma/enums";
import { formatCurrency } from "@/lib/formatter";
import { cn } from "@/lib/utils";
import { Badge } from "@/ui/badge";
import { ArrowDown, ArrowUp } from "lucide-react";

type AmountBadgeProps = {
  amount: number;
  type: TransactionType;
  className?: string;
};

export const AmountBadge = ({ amount, className, type }: AmountBadgeProps) => {
  return (
    <Badge className={cn(className)} variant={type}>
      {type === "DEBIT" ? <ArrowDown /> : <ArrowUp />}
      {formatCurrency(amount)}
    </Badge>
  );
};
