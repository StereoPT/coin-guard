import { getDaysOfMonth } from "@/lib/date";
import { monthlyAnalyticsAtom } from "@/store/analyticsStore";
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
import { format } from "date-fns";
import { useAtomValue } from "jotai";
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

type MonthlyChartProps = {
  transactions: Transaction[];
};

export const MonthlyChart = ({ transactions }: MonthlyChartProps) => {
  const selectedMonth = useAtomValue(monthlyAnalyticsAtom);

  const transactionData = useMemo(() => {
    const transactionsByDay = transactions.reduce<Record<string, number>>(
      (acc, t) => {
        const dayKey = format(t.date, "yyyy-MM-dd");
        acc[dayKey] = (acc[dayKey] || 0) + t.amount;
        return acc;
      },
      {},
    );

    const allDays = getDaysOfMonth(selectedMonth);

    const monthlyData = allDays.map((dayKey) => ({
      date: dayKey,
      amount: transactionsByDay[dayKey] || 0,
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
  }, [transactions, selectedMonth]);

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch border-b sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1">
          <CardTitle>Expenses per day</CardTitle>
          <CardDescription>
            Breakdown of daily expenses for the selected month
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer
          className="aspect-auto h-80 w-full pt-6"
          config={chartConfig}
        >
          <ComposedChart
            accessibilityLayer
            data={transactionData}
            margin={{ left: 24, right: 24, top: 24 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="date"
              tickFormatter={(value) => format(value, "yyyy-MM-dd")}
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
