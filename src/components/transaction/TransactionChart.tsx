import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Transaction } from '@/generated/prisma';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

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

  return (
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
          <Line dataKey="amount" type="monotone" strokeWidth={2} dot={false} />
        </LineChart>
      </ChartContainer>
    </div>
  );
};
