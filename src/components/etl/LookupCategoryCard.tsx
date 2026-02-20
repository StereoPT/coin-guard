import { DeleteLookupCategoriesDialog } from "@/components/etl/dialogs/DeleteLookupCategoriesDialog";
import { EditLookupCategoryDialog } from "@/components/etl/dialogs/EditLookupCategoryDialog";
import { LookupCategoryDetailsDialog } from "@/components/etl/dialogs/LookupCategoryDetailsDialog";
import { LookupCategoryItem } from "@/components/etl/LookupCategoryItem";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { CategoryWithLookups } from "@/types/categories";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Edit, Maximize, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";

type LookupCategoryCardProps = {
  categoryWithLookups: CategoryWithLookups;
};

export const LookupCategoryCard = ({
  categoryWithLookups,
}: LookupCategoryCardProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
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

      {showEditDialog && (
        <EditLookupCategoryDialog
          categoryWithLookups={categoryWithLookups}
          onOpenChange={setShowEditDialog}
          open={showEditDialog}
        />
      )}

      {showDeleteDialog && (
        <DeleteLookupCategoriesDialog
          categoryWithLookups={categoryWithLookups}
          onOpenChange={setShowDeleteDialog}
          open={showDeleteDialog}
        />
      )}

      <Card className="h-full">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>{categoryWithLookups.name}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon-sm" variant="outline">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setShowDetailsDialog(true)}>
                <Maximize /> Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                <Edit /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setShowDeleteDialog(true)}
                variant="destructive"
              >
                <Trash2 /> Delete
              </DropdownMenuItem>
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
