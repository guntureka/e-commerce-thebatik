"use server";

import { db } from "@/utils/db";
import { categorySchema } from "../schemas";
import { z } from "zod";

export const createCategory = async (data: z.infer<typeof categorySchema>) => {
  const validatedFields = categorySchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "invalid fields",
    };
  }

  const res = validatedFields.data;

  try {
    await db.category.create({
      data: {
        name: res.name,
        description: res.description,
      },
    });

    return {
      success: "Category created successfully",
    };
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
};

export const getCategoryById = async (id: string) => {
  try {
    const category = await db.category.findUnique({
      where: {
        id,
      },
    });
    return category;
  } catch (error) {
    return null;
  }
};

export const getAllCategories = async () => {
  try {
    const categories = await db.category.findMany();
    return categories;
  } catch (error) {
    return null;
  }
};

export const updateCategory = async (
  id: string,
  data: z.infer<typeof categorySchema>
) => {
  const validatedFields = categorySchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "invalid fields",
    };
  }

  const res = validatedFields.data;

  try {
    await db.category.update({
      data: {
        name: res.name,
        description: res.description,
      },
      where: {
        id: id!,
      },
    });

    return {
      success: "Category updated successfully",
    };
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
};

export const deleteCategory = async (id: string) => {
  try {
    await db.category.delete({
      where: {
        id: id!,
      },
    });

    return {
      success: "Category deleted successfully",
    };
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
};
