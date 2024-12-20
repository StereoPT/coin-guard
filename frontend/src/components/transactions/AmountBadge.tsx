import { TransactionType } from '@/types/transaction';
import { Badge } from '../ui/badge';
import { formatCurrency } from '@/lib/formatter';
import { cn } from '@/lib/utils';

type AmountBadgeProps = {
  amount: number;
  type: TransactionType;
  className?: string;
};

export const AmountBadge = ({ amount, className, type }: AmountBadgeProps) => {
  return (
    <Badge className={cn(className)} variant={type}>
      {type === 'debit' ? '-' : '+'}
      {formatCurrency(amount)}
    </Badge>
  );
};
