"use server";

import { prisma } from "@coin-guard/db/server";

export const DeleteLookupDescription = async (lookupDescriptionId: string) => {
  await prisma.lookupDescription.delete({
    where: { id: lookupDescriptionId },
  });
};
