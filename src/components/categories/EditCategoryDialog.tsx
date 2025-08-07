'use client';

import { EditCategoryForm } from '@/components/categories/EditCategoryForm';
import { DialogHeader } from '@/components/DialogHeader';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useGetCategory } from '@/hooks/categories/useGetCategory';
import { Edit, Tag } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';

type EditCategoryDialogProps = {
  id: string;
} & (
  | {
      trigger: true;
      open?: boolean;
      onOpenChange?: Dispatch<SetStateAction<boolean>>;
    }
  | {
      trigger?: never;
      open: boolean;
      onOpenChange: Dispatch<SetStateAction<boolean>>;
    }
);

export const EditCategoryDialog = ({
  open,
  onOpenChange,
  trigger,
  id,
}: EditCategoryDialogProps) => {
  const [dialogOpen, setDialogOpen] = useState(open ?? false);
  const { data: category, isPending } = useGetCategory(id);

  const handleOpenChange = (prevOpen: boolean) => {
    if (!trigger) {
      onOpenChange(prevOpen);
    }

    setDialogOpen(prevOpen);
  };

  if (isPending) {
    return null;
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      {trigger && (
        <DialogTrigger asChild>
          <Button>
            <Edit />
            Edit Category
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="px-0 py-4">
        <DialogHeader
          title="Edit Category"
          subtitle="Edit your category"
          icon={Tag}
        />
        <div className="px-4 pt-4">
          {category && (
            <EditCategoryForm
              initialValues={category}
              setOpen={handleOpenChange}
            />
          )}
        </div>
        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
};
