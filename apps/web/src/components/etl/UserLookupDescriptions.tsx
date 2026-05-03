"use client";

import { EmptyState } from "@/components/EmptyState";
import { ErrorAlert } from "@/components/ErrorAlert";
import { AddLookupDescriptionDialog } from "@/components/etl/dialogs/AddLookupDescriptionDialog";
import { lookupDescriptionColumns } from "@/constants/columns/lookupDescriptionColumns";
import { useGetLookupDescriptions } from "@/hooks/etl/descriptions/useGetLookupDescriptions";
import { DataTable } from "@stereopt/data-table";
import { TextInitialIcon } from "lucide-react";

export const UserLookupDescriptions = () => {
  const { data: lookupDescriptions } = useGetLookupDescriptions();

  if (!lookupDescriptions) {
    return <ErrorAlert />;
  }

  if (lookupDescriptions.length <= 0) {
    return (
      <EmptyState
        action={<AddLookupDescriptionDialog trigger />}
        description="Click the button below to add your first lookup description"
        icon={TextInitialIcon}
        title="No lookup descriptions added yet"
      />
    );
  }

  return (
    <DataTable columns={lookupDescriptionColumns} data={lookupDescriptions} />
  );
};
