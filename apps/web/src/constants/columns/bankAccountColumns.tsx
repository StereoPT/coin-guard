"use client";

import { BankAccountActions } from "@/components/bankAccounts/BankAccountActions";
import { BankAccountAvatar } from "@/components/bankAccounts/BankAccountAvatar";
import type { BankAccount } from "@coin-guard/db";
import { Badge } from "@coin-guard/ui";
import type { ColumnDef } from "@tanstack/react-table";

export const bankAccountColumns: ColumnDef<BankAccount>[] = [
  {
    accessorKey: "name",
    header: "Name",
    size: 510,
    cell: ({ row }) => {
      const { name, alias, iban } = row.original;

      return (
        <div className="flex items-center gap-4">
          {alias && <BankAccountAvatar alias={alias} />}
          <div className="flex flex-col">
            <div className="font-medium">{name}</div>
            <div className="text-xs text-muted-foreground">{iban}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    size: 110,
    cell: ({ row }) => {
      const { type } = row.original;

      return (
        <Badge className="capitalize" variant="outline">
          {type.toLocaleLowerCase()}
        </Badge>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    size: 50,
    cell: ({ row }) => {
      const bankAccount = row.original;

      return <BankAccountActions bankAccount={bankAccount} />;
    },
  },
];
