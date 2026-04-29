"use server";

import { prisma } from "@/lib/prisma";

export const ApplyLookupDescription = async (lookupDescriptionId: string) => {
  const lookupDescription = await prisma.lookupDescription.findUnique({
    where: { id: lookupDescriptionId },
  });

  if (!lookupDescription) {
    throw new Error("Lookup description not found");
  }

  const result = await prisma.transaction.updateMany({
    where: {
      description: lookupDescription.description,
    },
    data: {
      description: lookupDescription.newDescription,
    },
  });

  if (!result) {
    throw new Error("Failed to apply lookup description");
  }
};
