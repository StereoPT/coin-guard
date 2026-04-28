"use server";

import { prisma } from "@/lib/prisma";

export const GetLookupDescriptions = async () => {
  const descriptionLookups = await prisma.lookupDescription.findMany({});

  return descriptionLookups;
};
