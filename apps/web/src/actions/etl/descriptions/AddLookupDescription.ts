"use server";

import { parseOrThrow } from "@/lib/parseOrThrow";
import {
  addLookupDescriptionSchema,
  type addLookupDescriptionSchemaType,
} from "@/schemas/lookup";
import { prisma } from "@coin-guard/db/server";

export const AddLookupDescription = async (
  values: addLookupDescriptionSchemaType,
) => {
  const data = await parseOrThrow(addLookupDescriptionSchema, values);

  await prisma.lookupDescription.create({ data });
};
