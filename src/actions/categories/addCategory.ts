"use server";

import { prisma } from "@/lib/prisma";
import {
  addCategorySchema,
  type addCategorySchemaType,
} from "@/schemas/categories";

export const AddCategory = async (formValues: addCategorySchemaType) => {
  const { success, data } = await addCategorySchema.safeParseAsync(formValues);
  if (!success) {
    throw new Error("Invalid Form Data");
  }

  const result = await prisma.category.create({ data });
  if (!result) {
    throw new Error("Failed to Add Category");
  }
};
