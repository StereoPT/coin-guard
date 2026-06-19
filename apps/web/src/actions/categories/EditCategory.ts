"use server";

import { parseOrThrow } from "@/lib/parseOrThrow";
import {
  editCategorySchema,
  type editCategorySchemaType,
} from "@/schemas/categories";
import { prisma } from "@coin-guard/db/server";

export const EditCategory = async (
  categoryId: string,
  formValues: editCategorySchemaType,
) => {
  const data = await parseOrThrow(editCategorySchema, formValues);

  await prisma.category.update({
    where: { id: categoryId },
    data,
  });
};
