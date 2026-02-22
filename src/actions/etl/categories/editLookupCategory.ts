"use server";

import { prisma } from "@/lib/prisma";
import {
  editLookupCategorySchema,
  type editLookupCategorySchemaType,
} from "@/schemas/lookup";

export const EditLookupCategory = async (
  id: string,
  formValues: editLookupCategorySchemaType,
) => {
  const { success, data } =
    await editLookupCategorySchema.safeParseAsync(formValues);
  if (!success) {
    throw new Error("Invalid Form Data");
  }

  const result = await prisma.lookup_Category.update({
    where: { id },
    data,
  });
  if (!result) {
    throw new Error("Failed to Edit Lookup Category");
  }
};
