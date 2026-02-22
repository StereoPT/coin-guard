"use client";

import { EditCategoryDialog } from "@/components/categories/dialogs/EditCategoryDialog";
import { AddLookupCategoryDialog } from "@/components/etl/dialogs/AddLookupCategoryDialog";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, PlusCircle } from "lucide-react";
import { useState } from "react";

type EditCategoryProps = {
  id: string;
};

export const EditCategory = ({ id }: EditCategoryProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <AddLookupCategoryDialog
          categoryId={id}
          onOpenChange={setOpen}
          open={open}
        />
      )}

      <div>
        <ButtonGroup>
          <EditCategoryDialog id={id} trigger />
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
