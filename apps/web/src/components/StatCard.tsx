import { CountUpWrapper } from "@/components/CountUpWrapper";
import type { TransactionStat } from "@/types/analytics";
import type { CountType } from "@/types/dashboard";
import {
  Badge,
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@coin-guard/ui";
import { TrendingDown, TrendingUp } from "lucide-react";

type StatCardProps = {
  title: string;
  stat: TransactionStat;
  subfooter: string;
  countType: CountType;
};

export const StatCard = ({
  title,
  stat,
  subfooter,
  countType,
}: StatCardProps) => {
  const isNegativePercentage = Math.sign(stat?.percentage ?? 0) < 1;

  return (
    <Card className="from-primary/5 to-card bg-linear-to-t">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums">
          <CountUpWrapper type={countType} value={stat.value} />
        </CardTitle>
        <CardAction>
          {stat.percentage && (
            <Badge variant="outline">
              {!isNegativePercentage && "+"}
              {stat?.percentage?.toFixed(2)}%
              {isNegativePercentage ? <TrendingDown /> : <TrendingUp />}
            </Badge>
          )}
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        {stat.percentage && (
          <div className="line-clamp-1 flex gap-2 font-medium items-center">
            Trending {isNegativePercentage ? "down" : "up"}
            {isNegativePercentage ? (
              <TrendingDown className="size-4" />
            ) : (
              <TrendingUp className="size-4" />
            )}
          </div>
        )}
        <div className="text-muted-foreground">{subfooter}</div>
      </CardFooter>
    </Card>
  );
};
