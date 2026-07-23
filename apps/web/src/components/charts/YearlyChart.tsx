import { getMonthsOfYear } from "@/lib/date";
import { yearlyAnalyticsAtom } from "@/store/analyticsStore";
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
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
} from "@coin-guard/ui/charts";

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

type YearlyChartProps = {
  transactions: Transaction[];
};

export const YearlyChart = ({ transactions }: YearlyChartProps) => {
  const selectedYear = useAtomValue(yearlyAnalyticsAtom);

  const transactionData = useMemo(() => {
    const transactionsByMonth = transactions.reduce<Record<string, number>>(
      (acc, t) => {
        const monthKey = format(t.date, "yyyy-MM");
        acc[monthKey] = (acc[monthKey] || 0) + t.amount;
        return acc;
      },
      {},
    );

    const allMonths = getMonthsOfYear(selectedYear);

    const yearlyData = allMonths.map((monthKey) => ({
      date: monthKey,
      amount: transactionsByMonth[monthKey] || 0,
    }));

    return yearlyData.map((item, index, arr) => {
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
  }, [transactions, selectedYear]);

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch border-b sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1">
          <CardTitle>Expenses per Month</CardTitle>
          <CardDescription>
            Breakdown of expenses for each month
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
