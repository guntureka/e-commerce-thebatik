"use server";

import { db } from "@/utils/db";
import { z } from "zod";
import { userSchema } from "../schemas";

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

export const updateUserById = async (
  id: string,
  values: z.infer<typeof userSchema>
) => {
  const validatedFields = userSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { name, role } = validatedFields.data;

  console.log(name, role);

  try {
    await db.user.update({
      where: {
        id,
      },
      data: {
        name,
        role,
      },
    });

    return {
      success: "User updated successful",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong!",
    };
  }
};
export const createUser = async (values: z.infer<typeof userSchema>) => {
  try {
    // const user = await db.user.
    // return user;
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong!",
    };
  }
};

export const deleteUserById = async (id: string) => {
  try {
    await db.user.delete({
      where: { id },
    });

    return {
      success: "User deleted successful",
    };
  } catch (err) {
    console.log(err);
    return {
      error: "Something went wrong!",
    };
  }
};
