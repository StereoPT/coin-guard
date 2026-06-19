"use server";

import { prisma } from "@coin-guard/db/server";

export const DeleteLookupCategory = async (lookupCategoryId: string) => {
  await prisma.lookupCategory.delete({
    where: { id: lookupCategoryId },
  });
};
