"use server";

import { db } from "@/utils/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUser = async () => {
  try {
    const user = await db.user.findMany();

    return user;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserById = async (id: string, values: any) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
  }
};
