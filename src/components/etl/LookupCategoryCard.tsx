import { DeleteDialog } from "@/components/DeleteDialog";
import { AddLookupCategoryDialog } from "@/components/etl/dialogs/AddLookupCategoryDialog";
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
import { useDeleteAllLookupCategories } from "@/hooks/etl/categories/useDeleteAllLookupCategories";
import type { CategoryWithLookups } from "@/types/categories";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import {
  Edit,
  Maximize,
  MoreHorizontal,
  PlusCircle,
  Trash2,
} from "lucide-react";
import { useState } from "react";

type LookupCategoryCardProps = {
  categoryWithLookups: CategoryWithLookups;
};

export const LookupCategoryCard = ({
  categoryWithLookups,
}: LookupCategoryCardProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const { isPending, mutateAsync } = useDeleteAllLookupCategories(
    categoryWithLookups.id,
  );

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

      {showDeleteDialog && (
        <DeleteDialog
          description={
            <span>
              This will permanently delete all lookups in{" "}
              <b>{categoryWithLookups.name}</b>. This action cannot be undone.
            </span>
          }
          isPending={isPending}
          onDelete={mutateAsync}
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
              <DropdownMenuItem onClick={() => setShowAddDialog(true)}>
                <PlusCircle /> Add
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
