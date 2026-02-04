"use client";

import { AddTransactionDialog } from "@/components/transactions/AddTransactionDialog";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { ChevronDown, FileDown, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const AddTransaction = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AddTransactionDialog open={open} setOpen={setOpen} />
      <div>
        <ButtonGroup>
          <Button asChild>
            <Link href={ROUTES.importTransactions}>
              <FileDown />
              Import Transactions
            </Link>
          </Button>
          <ButtonGroupSeparator />
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
        </ButtonGroup>
      </div>
    </>
  );
};
