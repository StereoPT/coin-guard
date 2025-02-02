import { Category } from '@/types/category';
import { DataTable } from '../ui/data-table';
import { categoryColumns } from './category-columns';

type CategoriesTableProps = {
  categories: Category[];
};

export const CategoriesTable = ({ categories }: CategoriesTableProps) => {
  return (
    <DataTable
      data={categories ?? []}
      columns={categoryColumns}
      filterBy="name"
    />
  );
};
