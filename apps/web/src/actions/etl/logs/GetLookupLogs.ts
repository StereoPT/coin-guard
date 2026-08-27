"use server";

import { prisma } from "@coin-guard/db/server";

export const GetLookupLogs = async () => {
  const groupedLogs = await prisma.lookupLogging.groupBy({
    by: ["type", "lookupField", "description"],
    _count: { _all: true },
    _max: { createdAt: true },
    orderBy: [{ _max: { createdAt: "desc" } }, { description: "asc" }],
  });

  return groupedLogs.map(({ type, lookupField, description, _count, _max }) => ({
    type,
    lookupField,
    description,
    count: _count._all,
    lastSeenAt: _max.createdAt ?? new Date(),
  }));
};
