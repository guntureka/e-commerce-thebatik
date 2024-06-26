"use server";

import { productSchema } from "@/lib/schemas";
import { db } from "@/utils/db";
import { z } from "zod";
import { deleteUTFiles } from "./uploadthing";

export const getAllProducts = async () => {
  try {
    const response = await db.product.findMany({
      include: {
        category: true,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

// export const getAllProductsByCategorySlug = async (slug: String) => {
//   try {
//     const response = await db.product.findMany({
//       where: {
//         category: {
//           slug: slug,
//         },
//       },
//     });

//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getProductById = async (id: string) => {
  try {
    const response = await db.product.findUnique({
      where: {
        id,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (values: z.infer<typeof productSchema>) => {
  try {
    const validatedFields = productSchema.safeParse(values);

    if (!validatedFields.success) {
      return {
        error: "Invalid fields!",
      };
    }

    const {
      name,
      description,
      price,
      quantity,
      discount,
      sizes,
      images,
      categoryId,
    } = validatedFields.data;

    await db.product.create({
      data: {
        name,
        slug: name.toLowerCase().replaceAll(" ", "-"),
        description,
        price,
        quantity,
        discount,
        sizes,
        images,
        categoryId,
      },
    });

    return {
      success: "Product created successful",
    };
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (
  id: string,
  values: z.infer<typeof productSchema>
) => {
  try {
    const validatedFields = productSchema.safeParse(values);

    if (!validatedFields.success) {
      return {
        error: "Invalid fields!",
      };
    }

    const {
      name,
      description,
      price,
      quantity,
      discount,
      sizes,
      images,
      categoryId,
    } = validatedFields.data;

    await db.product.update({
      where: { id },
      data: {
        name,
        slug: name.toLowerCase().replaceAll(" ", "-"),
        description,
        price,
        quantity,
        discount,
        sizes,
        images,
        categoryId,
      },
    });

    return {
      success: "Product updated successful",
    };
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductById = async (id: string) => {
  try {
    const product = await getProductById(id);

    if (!product) {
      return {
        error: "No data",
      };
    }

    await deleteUTFiles(product.images);

    await db.product.delete({
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
