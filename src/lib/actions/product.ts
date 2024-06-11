"use server";

import { db } from "@/utils/db";
import { z } from "zod";
import { productSchema } from "../schemas";

export const createProduct = async (data: z.infer<typeof productSchema>) => {
  const validatedFields = productSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "invalid fields",
    };
  }

  const res = validatedFields.data;

  try {
    await db.product.create({
      data: {
        categoryId: res.categoryId,
        name: res.name,
        description: res.description,
        price: res.price,
        quantity: res.quantity,
        discount: res.discount,
        colors: res.colors,
        sizes: res.sizes,
        // images: res.images,
      },
    });

    return {
      success: "Product created successfully",
    };
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
};

// Get a product by id
export const getProductById = async (id: string) => {
  try {
    const product = await db.product.findUnique({
      where: {
        id,
      },
    });
    return product;
  } catch (error) {
    return null;
  }
};

export const getProductByCategoryId = async (id: string) => {
  try {
    const product = await db.product.findMany({
      where: {
        categoryId: id,
      },
    });
    return product;
  } catch (error) {
    return null;
  }
};

// Get all products
export const getAllProducts = async () => {
  try {
    const products = await db.product.findMany();
    return products;
  } catch (error) {
    return null;
  }
};

// Update a product
export const updateProduct = async (id: string, data: any) => {
  try {
    const product = await db.product.update({
      where: { id },
      data,
    });
    return product;
  } catch (error) {
    return null;
  }
};

// Delete a product
export const deleteProductById = async (id: string) => {
  try {
    await db.product.delete({
      where: {
        id: id!,
      },
    });

    return {
      success: "Product deleted successfully",
    };
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
};
