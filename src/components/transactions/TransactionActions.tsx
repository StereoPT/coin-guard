import { DeleteTransactionDialog } from '@/components/transactions/DeleteTransactionDialog';
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
import { useState } from 'react';

type TransactionActionsProps = {
  transaction: Transaction;
};

export const TransactionActions = ({
  transaction,
}: TransactionActionsProps) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  return (
    <>
      {showDeleteAlert && (
        <DeleteTransactionDialog
          open={showDeleteAlert}
          onOpenChange={setShowDeleteAlert}
          transaction={transaction}
        />
      )}

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
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setShowDeleteAlert(true)}>
            <Trash2 />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
