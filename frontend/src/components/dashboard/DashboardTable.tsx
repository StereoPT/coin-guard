import { DataTable } from '../ui/data-table/index';
import { transactionColumns } from '@/components/transactions/transaction-columns';
import { Transaction } from '@/types/transaction';

type DashboardTableProps = {
  transactions: Transaction[];
};

export const DashboardTable = ({ transactions }: DashboardTableProps) => {
  return (
    <DataTable
      data={transactions ?? []}
      columns={transactionColumns}
      filterBy="description"
    />
  );
};
