import { DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { TransactionType } from '@/types/transaction';
import { formatCurrency } from '@/lib/formatter';

type DashboardCardProps = {
  title: string;
  type: TransactionType;
  amount: number;
};

export const DashboardCard = ({ title, type, amount }: DashboardCardProps) => {
  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center pb-2 space-y-0">
        <CardTitle>{title}</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {type === 'debit' ? '-' : '+'}
          {formatCurrency(amount)}
        </div>
      </CardContent>
    </Card>
  );
};
