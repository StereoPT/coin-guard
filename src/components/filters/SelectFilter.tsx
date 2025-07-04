import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Table } from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';

type SelectFilterProps<TData> = {
  column: keyof TData;
  table: Table<TData>;
};

export const SelectFilter = <TData,>({
  column,
  table,
}: SelectFilterProps<TData>) => {
  const columnDef = table.getColumn(column as string);
  const facetedValues = columnDef?.getFacetedUniqueValues();
  const possibleValues = Array.from(facetedValues?.keys() || []) as string[];

  const hasFilter = columnDef?.getFilterValue();
  const selectText = hasFilter
    ? (columnDef?.getFilterValue() as string).toLowerCase()
    : column.toString();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="capitalize" variant="outline">
          {selectText}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="px-2 py-1.5 text-xs text-muted-foreground capitalize">
          {column.toString()}
        </DropdownMenuLabel>
        {possibleValues.map((option) => {
          return (
            <DropdownMenuCheckboxItem
              className="capitalize"
              key={option}
              checked={columnDef?.getFilterValue() === option}
              onCheckedChange={() => columnDef?.setFilterValue(option)}>
              {option.toLowerCase()}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
