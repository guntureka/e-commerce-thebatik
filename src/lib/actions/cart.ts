import { db } from "@/utils/db";
export const createCart = async (data: any) => {
    try {
      const cart = await db.cart.create({ data });
      return cart;
    } catch (error) {
      return null;
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
  

  export const updateCart = async (id: string, data: any) => {
    try {
      const cart = await db.cart.update({
        where: { id },
        data,
      });
      return cart;
    } catch (error) {
      return null;
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