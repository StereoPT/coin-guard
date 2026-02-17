import { AmountBadge } from "@/components/AmountBadge";
import type { TransactionWithCategory } from "@/types/transactions";
import { Badge } from "@/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import { format } from "date-fns";

type TransactionTableProps = {
  transactions: TransactionWithCategory[];
};

export const TransactionTable = ({ transactions }: TransactionTableProps) => {
  return (
    <div className="border rounded-lg shadow-md overflow-auto">
      <Table className="h-full">
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="gap-2 h-full overflow-auto">
          {transactions.map((t) => {
            return (
              <TableRow key={t.id}>
                <TableCell>{format(t.date, "PPP")}</TableCell>
                <TableCell>
                  {t.category && (
                    <Badge variant="outline">{t.category.name}</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <AmountBadge amount={t.amount} type={t.type} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
