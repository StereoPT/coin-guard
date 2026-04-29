"use client";

import { useExportDatabase } from "@/hooks/settings/useExportDatabase";
import { Button } from "@/ui/button";
import { DatabaseBackup, Loader2 } from "lucide-react";

export const UserSettings = () => {
  const { mutateAsync, isPending } = useExportDatabase();

  const handleExport = async () => {
    const result = await mutateAsync();

    if (result.success && result.filename) {
      const link = document.createElement("a");

      link.href = `/api/export-database?token=${result.downloadToken}`;
      link.download = result.filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex gap-4">
      <Button disabled={isPending} onClick={handleExport}>
        {isPending ? <Loader2 className="animate-spin" /> : <DatabaseBackup />}
        Export Database
      </Button>
    </div>
  );
};
