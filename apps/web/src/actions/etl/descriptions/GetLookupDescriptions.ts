"use server";

import { prisma } from "@coin-guard/db/server";

export const GetLookupDescriptions = async () => {
  const descriptionLookups = await prisma.lookupDescription.findMany({});

  return descriptionLookups;
};
