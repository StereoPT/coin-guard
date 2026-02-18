import type { Lookup_Category } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";
import type { CategoryWithLookups } from "@/types/categories";
import { Badge } from "@/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";

type LookupCategoryItemProps = {
  lookup: Lookup_Category;
};

const LookupCategoryItem = ({ lookup }: LookupCategoryItemProps) => {
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

type LookupCategoryCardProps = {
  categoryWithLookups: CategoryWithLookups;
};

export const LookupCategoryCard = ({
  categoryWithLookups,
}: LookupCategoryCardProps) => {
  const visibleLookups = categoryWithLookups.lookups.slice(0, 4);
  const remainingCount =
    categoryWithLookups.lookups.length - visibleLookups.length;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{categoryWithLookups.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <ul className="flex flex-col gap-2">
            {visibleLookups.map((lookup) => (
              <LookupCategoryItem key={lookup.id} lookup={lookup} />
            ))}
          </ul>
          {remainingCount > 0 && (
            <div className="text-xs text-muted-foreground">
              +{remainingCount} more
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
