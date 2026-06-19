"use server";

import { parseOrThrow } from "@/lib/parseOrThrow";
import {
  addLookupCategorySchema,
  type addLookupCategorySchemaType,
} from "@/schemas/lookup";
import { prisma } from "@coin-guard/db/server";

export const AddLookupCategory = async (
  formValues: addLookupCategorySchemaType,
) => {
  const data = await parseOrThrow(addLookupCategorySchema, formValues);

  await prisma.lookupCategory.create({ data });
};
