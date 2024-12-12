import { Row, RowData } from '@tanstack/react-table';

export const formatCurrentyColumn = <TData extends RowData>(
  row: Row<TData>,
  columnName: string,
) => {
  const amount = parseFloat(row.getValue(columnName) ?? 0);

  const formattedAmount = new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);

  return (
    <div className="text-right font-medium float-right">
      {amount ? formattedAmount : null}
    </div>
  );
};
