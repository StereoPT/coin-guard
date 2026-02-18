"use server";

import { prisma } from "@/lib/prisma";
import {
  addLookupCategorySchema,
  type addLookupCategorySchemaType,
} from "@/schemas/lookup";

export const AddLookupCategory = async (
  formValues: addLookupCategorySchemaType,
) => {
  const { success, data } =
    await addLookupCategorySchema.safeParseAsync(formValues);

  if (!success) {
    throw new Error("Invalid Form Data");
  }

  const result = await prisma.lookup_Category.create({ data });
  if (!result) {
    throw new Error("Failed to Add Lookup Category");
  }
};
