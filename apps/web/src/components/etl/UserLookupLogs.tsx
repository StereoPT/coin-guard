"use client";

import { LoadingState } from "@/components/LoadingState";
import { useGetLookupLogs } from "@/hooks/etl/logs/useGetLookupLogs";
import { LoggingType } from "@coin-guard/db";
import {
  Badge,
  cn,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@coin-guard/ui";
import { format } from "date-fns";

export const UserLookupLogs = () => {
  const { data: lookupLogs, isPending } = useGetLookupLogs();

  if (isPending || !lookupLogs) {
    return <LoadingState />;
  }

  return (
    <div className="border rounded-lg shadow-md overflow-auto">
      <Table className="h-full">
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead>Last Seen</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Field</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="gap-2 h-full overflow-auto">
          {lookupLogs.map((log) => (
            <TableRow
              className="text-muted-foreground"
              key={`${log.type}-${log.lookupField}-${log.description}`}
            >
              <TableCell className="text-xs text-muted-foreground p-0.75">
                {format(log.lastSeenAt, "PPP")}
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
                <Badge variant="outline">{log.lookupField}</Badge>
              </TableCell>
              <TableCell className="text-sm flex-1 p-0.75">
                {log.description}
              </TableCell>
              <TableCell className="text-sm p-0.75">
                {log.count > 1 && <Badge variant="outline">×{log.count}</Badge>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
