"use client";

import { useExportDatabase } from "@/hooks/settings/useExportDatabase";
import { Button, Spinner } from "@coin-guard/ui";
import { DatabaseBackup } from "@coin-guard/ui/icons";

export const UserSettings = () => {
  const { mutateAsync, isPending } = useExportDatabase();

  const handleExport = async () => {
    try {
      const { downloadToken, filename } = await mutateAsync();

      const link = document.createElement("a");

      link.href = `/api/export-database?token=${downloadToken}`;
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      // Error toast is already shown by useExportDatabase's onError.
    }
  };

  return (
    <div className="flex gap-4">
      <Button disabled={isPending} onClick={handleExport}>
        {isPending ? <Spinner /> : <DatabaseBackup />}
        Export Database
      </Button>
    </div>
  );
};
