import { CountUpWrapper } from "@/components/CountUpWrapper";
import { generateMonthRange } from "@/lib/date";
import { CountType } from "@/types/dashboard";
import type { Transaction } from "@coin-guard/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@coin-guard/ui";
import { endOfMonth, format, subMonths } from "date-fns";
import { useMemo } from "react";
import { Bar, CartesianGrid, ComposedChart, Line, XAxis } from "recharts";

const chartConfig = {
  amount: {
    label: "Amount",
    color: "#0f766e",
  },
  trend: {
    label: "Trend",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

type TransactionsChartProps = {
  transactions: Transaction[];
};

const CHART_START_DATE = new Date(2024, 0, 1);

export const TransactionsChart = ({ transactions }: TransactionsChartProps) => {
  const transactionData = useMemo(() => {
    if (transactions.length === 0) return [];

    const transactionsByMonth = transactions.reduce<Record<string, number>>(
      (acc, t) => {
        const monthKey = format(t.date, "yyyy-MM");
        acc[monthKey] = (acc[monthKey] || 0) + t.amount;
        return acc;
      },
      {},
    );

    const lastCompletedMonth = endOfMonth(subMonths(new Date(), 1));
    const allMonths = generateMonthRange(CHART_START_DATE, lastCompletedMonth);

    const monthlyData = allMonths.map((monthKey) => ({
      date: monthKey,
      amount: transactionsByMonth[monthKey] || 0,
    }));

    return monthlyData.map((item, index, arr) => {
      const startIndex = Math.max(0, index - 2);
      const windowSlice = arr.slice(startIndex, index + 1);
      const trend =
        windowSlice.reduce((acc, current) => acc + current.amount, 0) /
        windowSlice.length;

      return {
        ...item,
        trend,
      };
    });
  }, [transactions]);

  const sum = transactionData.reduce((acc, t) => (acc += t.amount), 0);
  const average =
    transactionData.length === 0 ? 0 : sum / transactionData.length;

  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-0!">
          <CardTitle>Transactions</CardTitle>
          <CardDescription>
            Showing transaction amount over time
          </CardDescription>
        </div>
        <div className="flex">
          <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
            <span className="text-muted-foreground text-xs">Sum</span>
            <span className="text-lg leading-none font-bold sm:text-3xl">
              <CountUpWrapper type={CountType.MONEY} value={sum} />
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
            <span className="text-muted-foreground text-xs">Average</span>
            <span className="text-lg leading-none font-bold sm:text-3xl">
              <CountUpWrapper type={CountType.MONEY} value={average} />
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          className="aspect-auto h-62.5 w-full"
          config={chartConfig}
        >
          <ComposedChart
            accessibilityLayer
            data={transactionData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="date"
              tickFormatter={(value) => format(value, "yyyy-MM")}
              tickLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              content={<ChartTooltipContent indicator="dot" />}
              cursor={false}
            />
            <Bar
              dataKey="amount"
              fill="var(--color-amount)"
              fillOpacity={0.8}
              radius={4}
            />
            <Line
              dataKey="trend"
              dot={false}
              stroke="var(--color-trend)"
              strokeDasharray="7 7"
              strokeWidth={2}
              type="monotone"
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
