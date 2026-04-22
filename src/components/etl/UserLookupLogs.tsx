"use client";

import { ErrorAlert } from "@/components/ErrorAlert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoggingType } from "@/generated/prisma/enums";
import { useGetLookupLogs } from "@/hooks/etl/logs/useGetLookupLogs";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export const UserLookupLogs = () => {
  const { data: lookupLogs } = useGetLookupLogs();

  if (!lookupLogs) {
    return <ErrorAlert />;
  }

  return (
    <div className="border rounded-lg shadow-md overflow-auto">
      <Table className="h-full">
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="gap-2 h-full overflow-auto">
          {lookupLogs.map((log) => (
            <TableRow className="text-muted-foreground" key={log.id}>
              <TableCell className="text-xs text-muted-foreground p-0.75">
                {format(log.createdAt, "PPP")}
              </TableCell>
              <TableCell
                className={cn(
                  "uppercase text-xs font-bold p-0.75",
                  log.type === LoggingType.ERROR && "text-destructive",
                  log.type === LoggingType.INFO && "text-primary",
                )}
              >
                {log.type}
              </TableCell>
              <TableCell className="text-sm flex-1 p-0.75">
                {log.message}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
