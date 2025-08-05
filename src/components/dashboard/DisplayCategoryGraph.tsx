import { GetCategoryStatsReturnValue } from '@/actions/analytics/getCategoryStats';
import {
  Card,
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
import { formatCurrency } from '@/lib/formatter';
import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';
import { endOfMonth, format, subMonths } from 'date-fns';
import { Cell, Pie, PieChart } from 'recharts';

const COLORS = [
  '#1e40af',
  '#3b82f6',
  '#60a5fa',
  '#93c5fd',
  '#dbeafe',
  '#1e3a8a',
  '#2563eb',
  '#7c3aed',
  '#6366f1',
  '#8b5cf6',
  '#a5b4fc',
  '#c7d2fe',
];

const chartConfig = {
  totalAmount: {
    label: 'Amount',
  },
} satisfies ChartConfig;

type DisplayCategoryGraphProps = {
  className: ClassValue;
  stats: GetCategoryStatsReturnValue[];
};

export const DisplayCategoryGraph = ({
  className,
  stats,
}: DisplayCategoryGraphProps) => {
  return (
    <Card className={cn('p-4', className)}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Category Summary</CardTitle>
        <CardDescription>
          Last Update - {format(endOfMonth(subMonths(new Date(), 1)), 'PPP')}
        </CardDescription>
      </CardHeader>
      <div>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value, name, item) => {
                    return (
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2.5 h-2.5 rounded-xs bg-(--color-bg)"
                          style={
                            {
                              '--color-bg': item.payload.fill,
                            } as React.CSSProperties
                          }
                        />
                        <span className="font-bold">{name}:</span>
                        <span>{formatCurrency(Number(value))}</span>
                      </div>
                    );
                  }}
                />
              }
            />
            <Pie
              data={stats}
              dataKey="totalAmount"
              nameKey="categoryName"
              innerRadius={60}
              outerRadius={100}
              stroke="#ffffff"
              strokeWidth={1}>
              {stats.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>
    </Card>
  );
};
