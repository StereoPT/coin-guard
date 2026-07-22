import { CHART_START_DATE } from "@/constants";
import { generateMonthRange } from "@/lib/date";
import type { Transaction } from "@coin-guard/db";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@coin-guard/ui";
import { endOfMonth, format, subMonths } from "date-fns";
import { useMemo } from "react";
import { Bar, CartesianGrid, ComposedChart, Line, XAxis } from "@coin-guard/ui/charts";

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

  return (
    <ChartContainer
      className="aspect-auto h-80 w-full pt-6"
      config={chartConfig}
    >
      <ComposedChart
        accessibilityLayer
        data={transactionData}
        margin={{ bottom: 24, left: 24, right: 24, top: 24 }}
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
  );
};
