import { EditCategoryForm } from '@/components/categories/EditCategoryForm';
import { DialogHeader } from '@/components/DialogHeader';
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog';
import { Category } from '@/generated/prisma';
import { Tag } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

type EditCategoryDialogProps = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  category: Category;
};

export const EditCategoryDialog = ({
  open,
  onOpenChange,
  category,
}: EditCategoryDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="px-0 py-4">
        <DialogHeader
          title="Edit Category"
          subtitle="Edit your category"
          icon={Tag}
        />
        <div className="px-4 pt-4">
          <EditCategoryForm setOpen={onOpenChange} initialValues={category} />
        </div>
        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
};
