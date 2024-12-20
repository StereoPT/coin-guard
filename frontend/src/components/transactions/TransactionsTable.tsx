'use client';

import { useTransactions } from '@/hooks/useTransactions';
import { DataTable } from '../ui/data-table';
import { transactionColumns } from '@/lib/transaction-columns';
import { MonthDropdown } from '../month-dropdown/MonthDropdown';
import { useState } from 'react';
import { getMonth, subMonths } from 'date-fns';

const TransactionsTable = () => {
  const [selectedMonth, setSelectedMonth] = useState<number>(
    getMonth(subMonths(new Date(), 1)) + 1,
  );
  const { data: transactions } = useTransactions({ month: selectedMonth });

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

export default TransactionsTable;
