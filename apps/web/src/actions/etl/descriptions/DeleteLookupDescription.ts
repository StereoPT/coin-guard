"use server";

import { prisma } from "@/lib/prisma";

export const DeleteLookupDescription = async (lookupDescriptionId: string) => {
  const result = await prisma.lookupDescription.delete({
    where: { id: lookupDescriptionId },
  });

  if (!result) {
    throw new Error("Failed to delete lookup description");
  }
};
