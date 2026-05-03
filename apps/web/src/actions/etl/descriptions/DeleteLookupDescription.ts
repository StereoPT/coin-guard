"use server";

import { prisma } from "@coin-guard/db/server";

export const DeleteLookupDescription = async (lookupDescriptionId: string) => {
  const result = await prisma.lookupDescription.delete({
    where: { id: lookupDescriptionId },
  });

  if (!result) {
    throw new Error("Failed to delete lookup description");
  }
};
