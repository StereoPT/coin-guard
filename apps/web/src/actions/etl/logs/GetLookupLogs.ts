"use server";

import { prisma } from "@coin-guard/db/server";

export const GetLookupLogs = async () => {
  const lookupLogs = await prisma.lookupLogging.findMany({
    orderBy: [{ createdAt: "desc" }, { description: "asc" }],
  });

  return lookupLogs;
};
