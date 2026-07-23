"use client";

import { AddTransactionDialog } from "@/components/transactions/dialogs/AddTransactionDialog";
import { ROUTES } from "@/constants/routes";
import {
  Button,
  ButtonGroup,
  ButtonGroupSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@coin-guard/ui";
import { ChevronDown, FileDown, PlusCircle } from "@coin-guard/ui/icons";
import Link from "next/link";
import { useState } from "react";

export const AddTransaction = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <AddTransactionDialog open={open} setOpen={setOpen} />}

      <div>
        <ButtonGroup>
          <Button
            nativeButton={false}
            render={<Link href={ROUTES.importTransactions} />}
          >
            <FileDown />
            Import Transactions
          </Button>
          <ButtonGroupSeparator />
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button size="icon" />}>
              <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setOpen(true)}>
                  <PlusCircle />
                  Add Transaction
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
      </div>
    </>
  );
};
