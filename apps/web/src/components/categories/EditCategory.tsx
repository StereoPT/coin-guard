"use client";

import { EditCategoryDialog } from "@/components/categories/dialogs/EditCategoryDialog";
import { AddLookupCategoryDialog } from "@/components/etl/dialogs/AddLookupCategoryDialog";
import {
  Button,
  ButtonGroup,
  ButtonGroupSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@coin-guard/ui";
import { ChevronDown, PlusCircle } from "@coin-guard/ui/icons";
import { useState } from "react";

type EditCategoryProps = {
  categoryId: string;
};

export const EditCategory = ({ categoryId }: EditCategoryProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <AddLookupCategoryDialog
          categoryId={categoryId}
          onOpenChange={setOpen}
          open={open}
        />
      )}

      <div>
        <ButtonGroup>
          <EditCategoryDialog categoryId={categoryId} trigger />
          <ButtonGroupSeparator />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon">
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <PlusCircle />
                Add Lookup
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
      </div>
    </>
  );
};
