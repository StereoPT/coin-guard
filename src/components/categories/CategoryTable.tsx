import { AmountBadge } from "@/components/AmountBadge";
import type { Transaction } from "@/generated/prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import { format } from "date-fns";

type CategoryTableProps = {
  transactions: Transaction[];
};

export const CategoryTable = ({ transactions }: CategoryTableProps) => {
  return (
    <div className="border rounded-lg shadow-md overflow-auto">
      <Table className="h-full">
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="gap-2 h-full overflow-auto">
          {transactions.map((t) => {
            return (
              <TableRow key={t.id}>
                <TableCell>{format(t.date, "PPP")}</TableCell>
                <TableCell>{t.description}</TableCell>
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
