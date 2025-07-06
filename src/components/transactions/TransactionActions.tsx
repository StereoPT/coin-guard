import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Transaction } from '@/generated/prisma';
import { Edit, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import Link from 'next/link';

type TransactionActionsProps = {
  transaction: Transaction;
};

export const TransactionActions = ({
  transaction,
}: TransactionActionsProps) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href={`/transactions/${transaction.id}`}>
              <Eye />
              Details
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Edit />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Trash2 />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
