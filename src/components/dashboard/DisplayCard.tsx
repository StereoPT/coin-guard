import type { TransactionStat } from "@/actions/analytics/getStats";
import { CountUpWrapper } from "@/components/CountUpWrapper";
import type { TransactionType } from "@/generated/prisma";
import { getTypeColor } from "@/lib/typeColors";
import { cn } from "@/lib/utils";
import { Badge } from "@/ui/badge";
import { Card } from "@/ui/card";
import type { ClassValue } from "clsx";
import { type LucideIcon, TrendingDown, TrendingUp } from "lucide-react";

type DisplayCardProps = {
  title: string;
  icon: LucideIcon;
  type: TransactionType;
  stat: TransactionStat;
  className?: ClassValue;
};

export const DisplayCard = ({
  title,
  icon,
  type,
  stat,
  className,
}: DisplayCardProps) => {
  const Icon = icon;
  const isNegativePercentage = Math.sign(stat.percentage) < 1;

  return (
    <Card className={cn("p-4", className)}>
      <div className="flex gap-4 items-center">
        <div className="flex items-center justify-center bg-secondary rounded-lg w-10 h-10">
          <Icon className={cn(getTypeColor(type))} size={30} />
        </div>
        <div className="flex flex-col">
          <div className="text-muted-foreground font-medium text-sm">
            {title}
          </div>
          <div className="flex items-center gap-4">
            <div className="font-bold text-lg">
              <CountUpWrapper value={stat.value} />
            </div>
            <Badge
              className={cn(getTypeColor(type, isNegativePercentage))}
              variant="secondary"
            >
              {stat.percentage.toFixed(2)}%
              {isNegativePercentage ? <TrendingDown /> : <TrendingUp />}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};
