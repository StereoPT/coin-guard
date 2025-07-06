'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Sigma } from 'lucide-react';
import { DisplayCard } from '@/components/DisplayCard';
import { useGetTransaction } from '@/hooks/transaction/useGetTransaction';
import { ErrorAlert } from '@/components/ErrorAlert';
import { format } from 'date-fns';

type UserTransactionProps = {
  transactionId: string;
};

export const UserTransaction = ({ transactionId }: UserTransactionProps) => {
  const { data: transaction, isLoading } = useGetTransaction(transactionId);

  if (isLoading) {
    return 'Loading...';
  }

  if (!transaction) {
    return <ErrorAlert />;
  }

  const sum = transaction.all.reduce((acc, t) => (acc += t.amount), 0);
  const average = sum / transaction.all.length;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-4">
        <DisplayCard title="Sum" icon={Sigma}>
          <div className="flex gap-2 items-center text-2xl font-bold">
            {sum?.toFixed(2)}€
          </div>
        </DisplayCard>
        <DisplayCard title="Average" icon={Sigma}>
          <div className="flex gap-2 items-center text-2xl font-bold">
            {average.toFixed(2)}€
          </div>
        </DisplayCard>
      </div>
      {/* <div className="border rounded-lg shadow-md overflow-auto">Graph</div> */}
      <div className="border rounded-lg shadow-md overflow-auto">
        <Table className="h-full">
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="gap-2 h-full overflow-auto">
            {transaction.all.map((t) => {
              return (
                <TableRow key={t.id}>
                  <TableCell>{format(t.date, 'PPP')}</TableCell>
                  <TableCell className="text-right capitalize">
                    {t.type.toLowerCase()}
                  </TableCell>
                  <TableCell className="text-right">
                    {t.amount.toFixed(2)}€
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
