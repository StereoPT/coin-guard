"use client";

import { AddTransactionDialog } from "@/components/transactions/AddTransactionDialog";
import { ImportTransactions } from "@/components/transactions/ImportTransactions";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { ChevronDown, PlusCircle } from "lucide-react";
import { useState } from "react";

export const AddTransaction = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AddTransactionDialog open={open} setOpen={setOpen} />
      <div className="flex">
        <ImportTransactions />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-l-none" size="icon">
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setOpen(true)}>
              <PlusCircle />
              Add Transaction
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
