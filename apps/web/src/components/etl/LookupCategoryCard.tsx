import { AddLookupCategoryDialog } from "@/components/etl/dialogs/AddLookupCategoryDialog";
import { EditLookupCategoryDialog } from "@/components/etl/dialogs/EditLookupCategoryDialog";
import type { CategoryWithLookups } from "@/types/categories";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@coin-guard/ui";
import { Edit, MoreHorizontal, PlusCircle } from "@coin-guard/ui/icons";
import { useState } from "react";

type LookupCategoryCardProps = {
  categoryWithLookups: CategoryWithLookups;
};

export const LookupCategoryCard = ({
  categoryWithLookups,
}: LookupCategoryCardProps) => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  return (
    <>
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
      </Card>
    </>
  );
};
