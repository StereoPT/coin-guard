'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Sigma } from 'lucide-react';
import { DisplayCard } from '@/components/DisplayCard';
import { useGetTransaction } from '@/hooks/transaction/useGetTransaction';
import { ErrorAlert } from '@/components/ErrorAlert';
import { format } from 'date-fns';
import { AmountBadge } from '@/components/AmountBadge';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

type UserTransactionProps = {
  transactionId: string;
};

const chartConfig = {
  date: {
    label: 'Amount',
  },
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

export const UserTransaction = ({ transactionId }: UserTransactionProps) => {
  const { data: transaction, isLoading } = useGetTransaction(transactionId);

  if (isLoading) {
    return 'Loading...';
  }

  if (!transaction) {
    return <ErrorAlert />;
  }

  const sum = transaction.all.reduce((acc, t) => (acc += t.amount), 0);
  const average = sum / transaction.all.length;
  const transactionData = transaction.all.map((t) => {
    return { date: t.date, amount: t.amount };
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-4">
        <DisplayCard title="Sum" icon={Sigma}>
          <div className="flex gap-2 items-center text-2xl font-bold">
            {sum?.toFixed(2)}€
          </div>
        </DisplayCard>
        <DisplayCard title="Average" icon={Sigma}>
          <div className="flex gap-2 items-center text-2xl font-bold">
            {average.toFixed(2)}€
          </div>
        </DisplayCard>
      </div>
      <div className="border rounded-lg shadow-md overflow-auto">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full">
          <LineChart
            accessibilityLayer
            data={transactionData}
            margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('pt-PT', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="date"
                  labelFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString('pt-PT', {
                      month: 'short',
                      day: 'numeric',
                    });
                  }}
                />
              }
            />
            <Line
              dataKey="amount"
              type="monotone"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </div>
      <div className="border rounded-lg shadow-md overflow-auto">
        <Table className="h-full">
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="gap-2 h-full overflow-auto">
            {transaction.all.map((t) => {
              return (
                <TableRow key={t.id}>
                  <TableCell>{format(t.date, 'PPP')}</TableCell>
                  <TableCell className="text-right">
                    <AmountBadge amount={t.amount} type={t.type} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
