import { DataTable } from '../ui/data-table/index';
import { transactionColumns } from '@/components/transactions/transaction-columns';
import { Transaction } from '@/types/transaction';

import { MonthDropdown } from '../month-dropdown/MonthDropdown';

type TransactionsTableProps = {
  transactions: Transaction[];
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
};

export const TransactionsTable = ({
  transactions,
  selectedMonth,
  setSelectedMonth,
}: TransactionsTableProps) => {
  return (
    <DataTable
      data={transactions ?? []}
      columns={transactionColumns}
      filterBy="description">
      <MonthDropdown
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
    </DataTable>
  );
};
