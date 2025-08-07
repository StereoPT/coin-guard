import { CountUpWrapper } from '@/components/CountUpWrapper';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Transaction } from '@/generated/prisma';
import { generateMonthRange } from '@/lib/date';
import { format } from 'date-fns';
import { useMemo } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

const chartConfig = {
  date: {
    label: 'Amount',
  },
} satisfies ChartConfig;

type TransactionChartProps = {
  transactions: Transaction[];
};

export const TransactionChart = ({ transactions }: TransactionChartProps) => {
  const transactionData = useMemo(() => {
    if (transactions.length === 0) return [];

    const transactionsByMonth = transactions.reduce<Record<string, number>>(
      (acc, t) => {
        const monthKey = format(t.date, 'yyyy-MM');
        acc[monthKey] = (acc[monthKey] || 0) + t.amount;
        return acc;
      },
      {},
    );

    const dates = transactions.map((t) => t.date.getTime());
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));

    const allMonths = generateMonthRange(minDate, maxDate);

    const transactionData = allMonths.map((monthKey) => ({
      date: monthKey,
      amount: transactionsByMonth[monthKey] || 0,
    }));

    return Object.values(transactionData);
  }, [transactions]);

  const sum = transactionData.reduce((acc, t) => (acc += t.amount), 0);
  const average = sum / transactionData.length;

  return (
    <Card className="py-4 sm:py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>Transaction Graph</CardTitle>
          <CardDescription>
            Showing transaction amount over time
          </CardDescription>
        </div>
        <div className="flex">
          <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
            <span className="text-muted-foreground text-xs">Sum</span>
            <span className="text-lg leading-none font-bold sm:text-3xl">
              <CountUpWrapper value={sum} />
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
            <span className="text-muted-foreground text-xs">Average</span>
            <span className="text-lg leading-none font-bold sm:text-3xl">
              <CountUpWrapper value={average} />
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full">
          <AreaChart
            accessibilityLayer
            data={transactionData}
            margin={{
              left: 12,
              right: 12,
            }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => format(value, 'yyyy-MM')}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area dataKey="amount" type="monotone" fillOpacity={0.4} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
