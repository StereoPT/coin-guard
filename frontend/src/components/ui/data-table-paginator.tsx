import { generatePaginationLinks } from '@/lib/generate-pages';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';
import { Table } from '@tanstack/react-table';

type PaginatorProps<TData> = {
  table: Table<TData>;
  showPreviousNext: boolean;
};

export const DataTablePaginator = <TData,>({
  table,
  showPreviousNext,
}: PaginatorProps<TData>) => {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  const onPageChange = (pageNumber: number) => {
    table.setPageIndex(pageNumber - 1);
  };

  return (
    <div className="flex items-center justify-end space-x-2 px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredRowModel().rows.length} row(s)
      </div>
      <div className="flex justify-end">
        <Pagination>
          <PaginationContent>
            {showPreviousNext && totalPages ? (
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage - 1 < 1}
                />
              </PaginationItem>
            ) : null}
            {generatePaginationLinks(currentPage, totalPages, onPageChange)}
            {showPreviousNext && totalPages && (
              <PaginationItem>
                <PaginationNext
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage > totalPages - 1}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
