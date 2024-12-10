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
        <TableRow>
          <TableCell>04/01/2024</TableCell>
          <TableCell>NOS Comunicacoes</TableCell>
          <TableCell className="text-right">50.21€</TableCell>
          <TableCell className="text-right" />
          <TableCell className="text-right">2616.84€</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>04/01/2024</TableCell>
          <TableCell>COMPRA GOLDPET</TableCell>
          <TableCell className="text-right">7.57€</TableCell>
          <TableCell className="text-right" />
          <TableCell className="text-right">2609.27€</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>05/01/2024</TableCell>
          <TableCell>TRF CXDAPP</TableCell>
          <TableCell className="text-right">664.20€</TableCell>
          <TableCell className="text-right" />
          <TableCell className="text-right">1945.07€</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;
