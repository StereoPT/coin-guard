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
import { Loader2 } from "lucide-react";
import { Cell, Pie, PieChart } from "recharts";

const COLORS = [
  "#99f6e4",
  "#5eead4",
  "#2dd4bf",
  "#14b8a6",
  "#0d9488",
  "#0f766e",
  "#115e59",
  "#134e4a",
  "#042f2e",
  "#7ee7d8",
  "#1fa796",
];

const chartConfig = {
  totalAmount: {
    label: "Amount",
  },
} satisfies ChartConfig;

type CategoryPieChartProps = {
  title: string;
  description: string;
  categoryStats?: CategoryStats[];
  className?: ClassValue;
};

export const CategoryPieChart = ({
  title,
  description,
  categoryStats,
  className,
}: CategoryPieChartProps) => {
  return (
    <Card className={cn("p-4", className)}>
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <div>
        {!categoryStats ? (
          <div className="flex items-center justify-center mx-auto aspect-square max-h-75">
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
