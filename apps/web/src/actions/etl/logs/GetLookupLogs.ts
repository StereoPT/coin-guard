"use server";

import { prisma } from "@/lib/prisma";

export const GetLookupLogs = async () => {
  const lookupLogs = await prisma.lookupLogging.findMany({
    orderBy: { createdAt: "desc" },
  });

  return lookupLogs;
};
