"use server";

import { prisma } from "@/lib/prisma";
import {
  editLookupDescriptionSchema,
  type editLookupDescriptionSchemaType,
} from "@/schemas/lookup";

export const EditLookupDescription = async (
  lookupDescriptionId: string,
  formValues: editLookupDescriptionSchemaType,
) => {
  const { success, data } =
    await editLookupDescriptionSchema.safeParseAsync(formValues);

  if (!success) {
    throw new Error("Invalid Form Data");
  }

  const result = await prisma.lookupDescription.update({
    where: { id: lookupDescriptionId },
    data,
  });

  if (!result) {
    throw new Error("Failed to Edit Lookup Description");
  }
};
