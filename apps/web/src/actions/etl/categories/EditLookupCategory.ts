"use server";

import { parseOrThrow } from "@/lib/parseOrThrow";
import {
  editLookupCategorySchema,
  type editLookupCategorySchemaType,
} from "@/schemas/lookup";
import { prisma } from "@coin-guard/db/server";

export const EditLookupCategory = async (
  lookupCategoryId: string,
  formValues: editLookupCategorySchemaType,
) => {
  const data = await parseOrThrow(editLookupCategorySchema, formValues);

  await prisma.lookupCategory.update({
    where: { id: lookupCategoryId },
    data,
  });
};
