import { formatCurrency } from "@/lib/formatter";
import type { TransactionType } from "@coin-guard/db";
import { Amount, cn } from "@coin-guard/ui";
import { ArrowDown, ArrowLeftRight, ArrowUp } from "@coin-guard/ui/icons";

type AmountTextProps = {
  amount: number;
  type: TransactionType;
  className?: string;
};

const typeIcons = {
  DEBIT: <ArrowDown />,
  CREDIT: <ArrowUp />,
  TRANSFER: <ArrowLeftRight />,
};

export const AmountText = ({ amount, className, type }: AmountTextProps) => {
  return (
    <Amount className={cn(className)} variant={type}>
      {typeIcons[type]}
      {formatCurrency(amount)}
    </Amount>
  );
};
