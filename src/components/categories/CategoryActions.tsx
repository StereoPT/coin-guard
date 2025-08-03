import { DeleteCategoryDialog } from '@/components/categories/DeleteCategoryDialog';
import { EditCategoryDialog } from '@/components/categories/EditCategoryDialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ROUTES } from '@/constants/routes';
import { Category } from '@/generated/prisma';
import { Edit, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type CategoryActionsProps = {
  category: Category;
};

export const CategoryActions = ({ category }: CategoryActionsProps) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  return (
    <>
      {showDeleteAlert && (
        <DeleteCategoryDialog
          open={showDeleteAlert}
          onOpenChange={setShowDeleteAlert}
          category={category}
        />
      )}

      {showEditDialog && (
        <EditCategoryDialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          category={category}
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
            <Link href={ROUTES.category(category.id)}>
              <Eye />
              Details
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
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
