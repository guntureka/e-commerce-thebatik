"use server";

import { auth } from "@/auth";
import { db } from "@/utils/db";

export const getAllCartByUserId = async (id: string) => {
  try {
    const carts = await db.cart.findMany({
      where: {
        userId: id,
      },
      include: {
        product: true,
      },
    });

    return carts;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCartById = async (id: string) => {
  try {
    const carts = await db.cart.findMany({
      where: {
        userId: id,
      },
      include: {
        product: true,
      },
    });

    return carts;
  } catch (error) {
    console.log(error);
  }
};

export const getCartByProductAndUser = async (
  productId: string,
  userId: string
) => {
  try {
    const cart = db.cart.findFirst({
      where: {
        productId,
        userId,
      },
    });

    return cart;
  } catch (error) {
    console.log(error);
  }
};

export const createCart = async (productId: string, quantity: number) => {
  try {
    const session = await auth();

    const user = session?.user;

    if (!user) {
      return { error: "Login first!" };
    }

    const existingCart = await getCartByProductAndUser(productId, user?.id!);

    if (!existingCart) {
      await db.cart.create({
        data: {
          productId: productId,
          quantity,
          userId: user.id!,
        },
      });

      return {
        success: "Cart added successful",
      };
    }
    return await updateCart(existingCart.id, existingCart.quantity + 1);
  } catch (error) {
    console.log();
  }
};

export const updateCart = async (id: string, quantity: number) => {
  try {
    await db.cart.update({
      where: {
        id,
      },

      data: {
        quantity,
      },
    });

    return {
      success: "Cart updated successful",
    };
  } catch (error) {
    console.log();
  }
};

export const deleteCartById = async (id: string) => {
  try {
    await db.cart.delete({
      where: {
        id,
      },
    });

    return {
      success: "Cart deleted successful",
    };
  } catch (error) {
    console.log(error);
  }
};
