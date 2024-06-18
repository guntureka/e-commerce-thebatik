import { db } from "@/utils/db";
import { wishlistSchema } from "../schemas";
import { z } from "zod";

export const createWishlist = async (data: z.infer<typeof wishlistSchema>) => {
    const validatedFields = wishlistSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        error: "invalid fields",
      };
    }

    const res = validatedFields.data;

    try {
    await db.wishlist.create({
      data: res,
    });

    return {
      success: "Wishlist created successfully",
    };
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
  };
  

  export const getWishlistById = async (id: string) => {
    try {
      const wishlist = await db.wishlist.findUnique({
        where: {
          id,
        },
      });
      return wishlist;
    } catch (error) {
      return null;
    }
  };
  

  export const getAllWishlist = async () => {
    try {
      const wishlist = await db.wishlist.findMany({});
      return wishlist;
    } catch (error) {
      return null;
    }
  };
  

  export const updateWishlist = async (id : string,data: z.infer<typeof wishlistSchema>) => {
    const validatedFields = wishlistSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        error: "invalid fields",
      };
    }

    const res = validatedFields.data;

    try {
    await db.wishlist.update({
      where : {id},
      data: res,
    });

    return {
      success: "Wishlist created successfully",
    };
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
  };
  

  export const deleteWishlist = async (id: string) => {
    try {
      const wishlist = await db.wishlist.delete({
        where: { id },
      });
      return wishlist;
    } catch (error) {
      return null;
    }
  };