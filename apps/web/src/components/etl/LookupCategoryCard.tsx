import { AddLookupCategoryDialog } from "@/components/etl/dialogs/AddLookupCategoryDialog";
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
import { MoreHorizontal, PlusCircle } from "@coin-guard/ui/icons";
import { useState } from "react";

type LookupCategoryCardProps = {
  categoryWithLookups: CategoryWithLookups;
};

export const LookupCategoryCard = ({
  categoryWithLookups,
}: LookupCategoryCardProps) => {
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <>
      {showAddDialog && (
        <AddLookupCategoryDialog
          categoryId={categoryWithLookups.id}
          onOpenChange={setShowAddDialog}
          open={showAddDialog}
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
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
      </Card>
    </>
  );
};
