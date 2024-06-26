"use server";

import { categorySchema } from "@/lib/schemas";
import { db } from "@/utils/db";
import { z } from "zod";

export const getAllCategories = async () => {
  try {
    const response = await db.category.findMany();

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryById = async (id: string) => {
  try {
    const response = await db.category.findUnique({
      where: {
        id,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createCategory = async (
  values: z.infer<typeof categorySchema>
) => {
  try {
    const validatedfields = categorySchema.safeParse(values);

    if (!validatedfields.success) {
      return {
        error: "Invalid fields!",
      };
    }

    const { name, description } = validatedfields.data;

    await db.category.create({
      data: {
        name,
        slug: name.toLowerCase().replaceAll(" ", "-"),
        description,
      },
    });

    return {
      success: "Data created successful",
    };
  } catch (error) {
    console.log(error);
  }
};

export const updateCategoryById = async (
  id: string,
  values: z.infer<typeof categorySchema>
) => {
  try {
    const validatedfields = categorySchema.safeParse(values);

    if (!validatedfields.success) {
      return {
        error: "Invalid fields!",
      };
    }

    const { name, description } = validatedfields.data;

    await db.category.update({
      where: {
        id,
      },
      data: {
        name,
        slug: name.toLowerCase().replaceAll(" ", "-"),
        description,
      },
    });

    return {
      success: "Data updated successful",
    };
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategoryById = async (id: string) => {
  try {
    const category = await getCategoryById(id);

    if (!category) {
      return {
        error: "No data",
      };
    }

    await db.category.delete({
      where: {
        id,
      },
    });

    return {
      success: "Data deleted successful",
    };
  } catch (error) {
    console.log(error);
  }
};
