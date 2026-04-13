"use server";

import { prisma } from "@/lib/prisma";
import {
  editLookupCategorySchema,
  type editLookupCategorySchemaType,
} from "@/schemas/lookup";

export const EditLookupCategory = async (
  lookupCategoryId: string,
  formValues: editLookupCategorySchemaType,
) => {
  const { success, data } =
    await editLookupCategorySchema.safeParseAsync(formValues);

  if (!success) {
    throw new Error("Invalid Form Data");
  }

  const result = await prisma.lookupCategory.update({
    where: { id: lookupCategoryId },
    data,
  });

  if (!result) {
    throw new Error("Failed to Edit Lookup Category");
  }
};
