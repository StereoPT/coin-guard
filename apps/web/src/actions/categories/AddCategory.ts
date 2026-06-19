"use server";

import { parseOrThrow } from "@/lib/parseOrThrow";
import {
  addCategorySchema,
  type addCategorySchemaType,
} from "@/schemas/categories";
import { prisma } from "@coin-guard/db/server";

export const AddCategory = async (formValues: addCategorySchemaType) => {
  const data = await parseOrThrow(addCategorySchema, formValues);

  await prisma.category.create({ data });
};
