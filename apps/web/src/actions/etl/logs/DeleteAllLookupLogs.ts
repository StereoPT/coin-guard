"use server";

import { prisma } from "@coin-guard/db/server";

export const DeleteAllLookupLogs = async () => {
  await prisma.lookupLogging.deleteMany();
};
