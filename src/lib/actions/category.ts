import { db } from "@/utils/db";

export const createCategory = async (data: any) => {
    try {
      const category = await db.category.create({ data });
      return category;
    } catch (error) {
      return null;
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
      const categories = await db.category.findMany({});
      return categories;
    } catch (error) {
      return null;
    }
  };
  

  export const updateCategory = async (id: string, data: any) => {
    try {
      const category = await db.category.update({
        where: { id },
        data,
      });
      return category;
    } catch (error) {
      return null;
    }
  };
  

  export const deleteCategory = async (id: string) => {
    try {
      const category = await db.category.delete({
        where: { id },
      });
      return category;
    } catch (error) {
      return null;
    }
  };