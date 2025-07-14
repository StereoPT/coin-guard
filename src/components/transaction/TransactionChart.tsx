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
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

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

type TransactionChartProps = {
  transactions: Transaction[];
};

export const TransactionChart = ({ transactions }: TransactionChartProps) => {
  const transactionData = transactions.map((t) => {
    return { date: t.date, amount: t.amount };
  });

  const sum = transactions.reduce((acc, t) => (acc += t.amount), 0);
  const average = sum / transactions.length;

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
              {sum.toFixed(2)}€
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
            <span className="text-muted-foreground text-xs">Average</span>
            <span className="text-lg leading-none font-bold sm:text-3xl">
              {average.toFixed(2)}€
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
              tickFormatter={(value) => format(value, 'P', { locale: pt })}
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
