import type { Transaction } from "@/generated/prisma";
import { getMonthsOfYear } from "@/lib/date";
import { Card, CardContent } from "@/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/ui/chart";
import { format } from "date-fns";
import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  date: {
    label: "Amount",
  },
} satisfies ChartConfig;

type YearlyChartProps = {
  transactions?: Transaction[];
  selectedYear: number;
};

export const YearlyChart = ({
  transactions = [],
  selectedYear,
}: YearlyChartProps) => {
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

    const transactionData = allMonths.map((monthKey) => ({
      date: monthKey,
      amount: transactionsByMonth[monthKey] || 0,
    }));

    return Object.values(transactionData);
  }, [transactions, selectedYear]);

  return (
    <Card className="col-span-2">
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          className="aspect-auto h-[250px] w-full"
          config={chartConfig}
        >
          <AreaChart
            accessibilityLayer
            data={transactionData}
            margin={{ left: 12, right: 12 }}
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
              content={<ChartTooltipContent indicator="line" />}
              cursor={false}
            />
            <Area dataKey="amount" fillOpacity={0.4} type="monotone" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
