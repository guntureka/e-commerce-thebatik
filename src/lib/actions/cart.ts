import { db } from "@/utils/db";
import { z } from "zod";
import { cartSchema } from "../schemas";
export const createCart = async (data: z.infer<typeof cartSchema>) => {
  try {
    const validatedFields = cartSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        error: "invalid fields",
      };
    }

    const res = validatedFields.data;

    await db.cart.create({ data: res });

    return {
      success: "Cart created successfully",
    };
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
};

export const getCartById = async (id: string) => {
  try {
    const cart = await db.cart.findUnique({
      where: {
        id,
      },
    });
    return cart;
  } catch (error) {
    return null;
  }
};

export const getAllCarts = async () => {
  try {
    const carts = await db.cart.findMany({});
    return carts;
  } catch (error) {
    return null;
  }
};

export const updateCart = async (
  id: string,
  data: z.infer<typeof cartSchema>
) => {
  try {
    const validatedFields = cartSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        error: "invalid fields",
      };
    }

    const res = validatedFields.data;

    await db.cart.update({
      where: {
        id,
      },
      data: res,
    });

    return {
      success: "Cart updated successfully",
    };
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
};

export const deleteCart = async (id: string) => {
  try {
    const cart = await db.cart.delete({
      where: { id },
    });
    return cart;
  } catch (error) {
    return null;
  }
};
