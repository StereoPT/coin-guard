"use server";

import { parseOrThrow } from "@/lib/parseOrThrow";
import {
  editLookupDescriptionSchema,
  type editLookupDescriptionSchemaType,
} from "@/schemas/lookup";
import { prisma } from "@coin-guard/db/server";

export const EditLookupDescription = async (
  lookupDescriptionId: string,
  formValues: editLookupDescriptionSchemaType,
) => {
  const data = await parseOrThrow(editLookupDescriptionSchema, formValues);

  await prisma.lookupDescription.update({
    where: { id: lookupDescriptionId },
    data,
  });
};
