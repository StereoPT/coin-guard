import { AddLookupCategoryDialog } from "@/components/etl/dialogs/AddLookupCategoryDialog";
import { EditLookupCategoryDialog } from "@/components/etl/dialogs/EditLookupCategoryDialog";
import { LookupCategoryDetailsDialog } from "@/components/etl/dialogs/LookupCategoryDetailsDialog";
import { LookupCategoryItem } from "@/components/etl/LookupCategoryItem";
import type { CategoryWithLookups } from "@/types/categories";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@coin-guard/ui";
import {
  Edit,
  Maximize,
  MoreHorizontal,
  PlusCircle,
} from "@coin-guard/ui/icons";
import { useState } from "react";

type LookupCategoryCardProps = {
  categoryWithLookups: CategoryWithLookups;
};

export const LookupCategoryCard = ({
  categoryWithLookups,
}: LookupCategoryCardProps) => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const visibleLookups = categoryWithLookups.lookups.slice(0, 4);
  const remainingCount =
    categoryWithLookups.lookups.length - visibleLookups.length;

  return (
    <>
      {showDetailsDialog && (
        <LookupCategoryDetailsDialog
          categoryWithLookups={categoryWithLookups}
          onOpenChange={setShowDetailsDialog}
          open={showDetailsDialog}
        />
      )}

      {showAddDialog && (
        <AddLookupCategoryDialog
          categoryId={categoryWithLookups.id}
          onOpenChange={setShowAddDialog}
          open={showAddDialog}
        />
      )}

      {showEditDialog && (
        <EditLookupCategoryDialog
          categoryWithLookups={categoryWithLookups}
          onOpenChange={setShowEditDialog}
          open={showEditDialog}
        />
      )}

      <Card className="h-full">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>{categoryWithLookups.name}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button size="icon-sm" variant="outline" />}
            >
              <MoreHorizontal />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setShowDetailsDialog(true)}>
                  <Maximize /> Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowAddDialog(true)}>
                  <PlusCircle /> Add
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                  <Edit /> Edit
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
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
    </>
  );
};
