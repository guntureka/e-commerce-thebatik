import { db } from "@/utils/db";

export const createCartItem = async (data: any) => {
    try {
      const cartItem = await db.cart_Item.create({ data });
      return cartItem;
    } catch (error) {
      return null;
    }
  };
  

  export const getCartItemById = async (id: string) => {
    try {
      const cartItem = await db.cart_Item.findUnique({
        where: {
          id,
        },
      });
      return cartItem;
    } catch (error) {
      return null;
    }
  };
  

  export const getAllCartItems = async () => {
    try {
      const cartItems = await db.cart_Item.findMany({});
      return cartItems;
    } catch (error) {
      return null;
    }
  };
  

  export const updateCartItem = async (id: string, data:any) => {
    try {
      const cartItem = await db.cart_Item.update({
        where: { id },
        data,
      });
      return cartItem;
    } catch (error) {
      return null;
    }
  };
  

  export const deleteCartItem = async (id: string) => {
    try {
      const cartItem = await db.cart_Item.delete({
        where: { id },
      });
      return cartItem;
    } catch (error) {
      return null;
    }
  };