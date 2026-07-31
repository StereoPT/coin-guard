import type { TransactionType } from "@coin-guard/db";
import { formatCurrency } from "@/lib/formatter";
import { cn } from "@coin-guard/ui";
import { Badge } from "@coin-guard/ui";
import { ArrowDown, ArrowLeftRight, ArrowUp } from "@coin-guard/ui/icons";

type AmountBadgeProps = {
  amount: number;
  type: TransactionType;
  className?: string;
};

const typeIcons = {
  DEBIT: <ArrowDown />,
  CREDIT: <ArrowUp />,
  TRANSFER: <ArrowLeftRight />,
};

export const AmountBadge = ({ amount, className, type }: AmountBadgeProps) => {
  return (
    <Badge className={cn(className)} variant={type}>
      {typeIcons[type]}
      {formatCurrency(amount)}
    </Badge>
  );
};
