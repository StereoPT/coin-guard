import { CountUpWrapper } from "@/components/CountUpWrapper";
import { cn } from "@/lib/utils";
import { Card } from "@/ui/card";
import { Skeleton } from "@/ui/skeleton";
import type { ClassValue } from "clsx";
import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  icon: LucideIcon;
  title: string;
  stat?: number;
  iconColor?: ClassValue;
};

export const StatCard = ({ icon, title, stat, iconColor }: StatCardProps) => {
  const Icon = icon;

  return (
    <Card className="p-4">
      <div className="flex gap-4 items-center">
        <div className="flex items-center justify-center bg-secondary rounded-lg w-10 h-10">
          <Icon className={cn(iconColor)} size={30} />
        </div>
        <div className="flex flex-col">
          <div className="text-muted-foreground font-medium text-sm">
            {title}
          </div>
          <div className="font-bold text-lg">
            {!stat ? (
              <Skeleton className="w-32 h-7" />
            ) : (
              <CountUpWrapper value={stat} />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
