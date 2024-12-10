'use client';

import { useQuery } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { getTransactions } from '@/services/transactionService';

const TransactionsTable = () => {
  const { data: transactions } = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  });

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
              <TableCell>{transaction.date}</TableCell>
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
