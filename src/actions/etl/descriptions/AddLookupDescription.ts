"use server";

import { prisma } from "@/lib/prisma";
import {
  addLookupDescriptionSchema,
  type addLookupDescriptionSchemaType,
} from "@/schemas/lookup";

export const AddLookupDescription = async (
  values: addLookupDescriptionSchemaType,
) => {
  const { success, data } =
    await addLookupDescriptionSchema.safeParseAsync(values);

  if (!success) {
    throw new Error("Invalid Form Data");
  }

  const result = await prisma.lookupDescription.create({ data });
  if (!result) {
    throw new Error("Failed to Add Lookup Description");
  }
};
