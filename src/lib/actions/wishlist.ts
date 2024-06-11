import { db } from "@/utils/db";

export const createProduct = async (data: any) => {
    try {
      const product = await db.product.create({ data });
      return product;
    } catch (error) {
      return null;
    }
  };
  

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
  

  export const getAllProducts = async () => {
    try {
      const products = await db.product.findMany({});
      return products;
    } catch (error) {
      return null;
    }
  };
  

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
  

  export const deleteProduct = async (id: string) => {
    try {
      const product = await db.product.delete({
        where: { id },
      });
      return product;
    } catch (error) {
      return null;
    }
  };