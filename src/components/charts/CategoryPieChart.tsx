import { formatCurrency } from "@/lib/formatter";
import { cn } from "@/lib/utils";
import type { CategoryStats } from "@/types/categories";
import { Card, CardDescription, CardHeader, CardTitle } from "@/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/ui/chart";
import type { ClassValue } from "clsx";
import { endOfMonth, format, subMonths } from "date-fns";
import { Loader2 } from "lucide-react";
import { Cell, Pie, PieChart } from "recharts";

const COLORS = [
  "#1e40af",
  "#3b82f6",
  "#60a5fa",
  "#93c5fd",
  "#dbeafe",
  "#1e3a8a",
  "#2563eb",
  "#7c3aed",
  "#6366f1",
  "#8b5cf6",
  "#a5b4fc",
  "#c7d2fe",
];

const chartConfig = {
  totalAmount: {
    label: "Amount",
  },
} satisfies ChartConfig;

type CategoryPieChartProps = {
  categoryStats?: CategoryStats[];
  className?: ClassValue;
  hasHeader?: boolean;
};

export const CategoryPieChart = ({
  categoryStats,
  className,
  hasHeader = true,
}: CategoryPieChartProps) => {
  return (
    <Card className={cn("p-4", className)}>
      {hasHeader && (
        <CardHeader className="items-center pb-0">
          <CardTitle>Category Summary</CardTitle>
          <CardDescription>
            Last Update - {format(endOfMonth(subMonths(new Date(), 1)), "PPP")}
          </CardDescription>
        </CardHeader>
      )}
      <div>
        {!categoryStats ? (
          <div className="flex items-center justify-center mx-auto aspect-square max-h-[300px]">
            <Loader2 className="animate-spin text-muted-foreground" size={64} />
          </div>
        ) : (
          <ChartContainer
            className="mx-auto aspect-square max-h-[300px]"
            config={chartConfig}
          >
            <PieChart>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value, name, item) => {
                      return (
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2.5 h-2.5 rounded-xs bg-(--color-bg)"
                            style={
                              {
                                "--color-bg": item.payload.fill,
                              } as React.CSSProperties
                            }
                          />
                          <span className="font-bold">{name}:</span>
                          <span>{formatCurrency(Number(value))}</span>
                        </div>
                      );
                    }}
                    hideLabel
                  />
                }
                cursor={false}
              />
              <Pie
                data={categoryStats}
                dataKey="totalAmount"
                innerRadius={60}
                nameKey="categoryName"
                outerRadius={100}
                stroke="#ffffff"
                strokeWidth={1}
              >
                {categoryStats?.map((entry, index) => (
                  <Cell
                    fill={COLORS[index % COLORS.length]}
                    key={`cell-${entry.categoryId}`}
                  />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </div>
    </Card>
  );
};
