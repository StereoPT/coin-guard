"use server";

import prisma from "@/lib/prisma";
import {
  editCategorySchema,
  type editCategorySchemaType,
} from "@/schemas/categories";

export const EditCategory = async (
  categoryId: string,
  formValues: editCategorySchemaType,
) => {
  const { success, data } = await editCategorySchema.safeParseAsync(formValues);
  if (!success) {
    throw new Error("Invalid Form Data");
  }

  const result = await prisma.category.update({
    where: { id: categoryId },
    data,
  });
  if (!result) {
    throw new Error("Failed to Edit Category");
  }
};
