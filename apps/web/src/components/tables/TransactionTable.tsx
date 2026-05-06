import { AmountBadge } from "@/components/AmountBadge";
import type { TransactionWithCategory } from "@/types/transactions";
import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@coin-guard/ui";
import { format } from "date-fns";

type TransactionTableProps = {
  transactions: TransactionWithCategory[];
};

export const TransactionTable = ({ transactions }: TransactionTableProps) => {
  return (
    <Table className="h-full">
      <TableHeader className="bg-muted">
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="gap-2 h-full overflow-auto">
        {transactions.map((t) => {
          return (
            <TableRow key={t.id}>
              <TableCell className="py-1">
                <div className="flex flex-col text-xs">
                  <div className="font-medium">{t.description}</div>
                  <div className="text-muted-foreground">
                    {format(t.date, "PPP")}
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-1">
                {t.category && (
                  <Badge variant="outline">{t.category.name}</Badge>
                )}
              </TableCell>
              <TableCell className="text-right py-1">
                <AmountBadge amount={t.amount} type={t.type} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
