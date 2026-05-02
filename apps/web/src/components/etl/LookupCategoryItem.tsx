import { Badge } from "@coin-guard/ui";
import type { LookupCategory } from "@/generated/prisma/client";
import { cn } from "@coin-guard/ui";

type LookupCategoryItemProps = {
  lookup: LookupCategory;
};

export const LookupCategoryItem = ({ lookup }: LookupCategoryItemProps) => {
  return (
    <li className="flex items-center justify-between gap-4" key={lookup.id}>
      <div className="text-sm truncate">{lookup.description}</div>
      <Badge
        className={cn(!lookup.enabled && "text-muted-foreground")}
        variant={lookup.enabled ? "secondary" : "outline"}
      >
        {lookup.enabled ? "Enabled" : "Disabled"}
      </Badge>
    </li>
  );
};
