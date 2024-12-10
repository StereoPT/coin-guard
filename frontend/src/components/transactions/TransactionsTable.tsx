'use client';

import { useTransactions } from '@/hooks/useTransactions';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

const TransactionsTable = () => {
  const { data: transactions } = useTransactions();

  return (
    <Table>
      <TableCaption>A list with your transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Debit</TableHead>
          <TableHead className="text-right">Credit</TableHead>
          <TableHead className="text-right">Balance</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions?.map((transaction) => {
          return (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date.toString()}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell className="text-right">{transaction.debit}</TableCell>
              <TableCell className="text-right">{transaction.credit}</TableCell>
              <TableCell className="text-right">
                {transaction.balance}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;
