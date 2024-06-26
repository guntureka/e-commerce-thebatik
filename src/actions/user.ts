"use server";

import { userSchema } from "@/lib/schemas";
import { db } from "@/utils/db";
import { z } from "zod";
import bcrypt from "bcryptjs";

export const getAllUser = async () => {
  try {
    const users = await db.user.findMany();

    return users;
  } catch (error) {
    console.log(error);
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findFirst({
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

export const createUser = async (values: z.infer<typeof userSchema>) => {
  try {
    const validatedFields = userSchema.safeParse(values);

    if (!validatedFields.success) {
      return {
        error: "Invalid fields!",
      };
    }

    const { name, email, password, role } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return {
        error: "User already exist!",
      };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        role,
        emailVerified: new Date(),
      },
    });

    return {
      success: "User created successful",
    };
  } catch (error) {
    console.log(error);
  }
};

export const updateUserById = async (
  id: string,
  values: z.infer<typeof userSchema>
) => {
  try {
    const validatedFields = userSchema.safeParse(values);

    if (!validatedFields.success) {
      return {
        error: "Invalid fields!",
      };
    }

    const { name, email, password, role } = validatedFields.data;

    const user = await getUserById(id);

    if (!user) {
      return {
        error: "User doesnt exist!",
      };
    }

    const passwordCompare = password == user.password! ? true : false;

    console.log(passwordCompare);

    let passwordData = "";

    if (passwordCompare) {
      passwordData = user.password!;
    } else {
      passwordData = await bcrypt.hash(password, 10);
    }

    await db.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password: passwordData,
        role,
      },
    });

    return {
      success: "User updated successful",
    };
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserById = async (id: string) => {
  try {
    const user = await getUserById(id);

    if (!user) {
      return {
        error: "User doesnt exist!",
      };
    }

    await db.user.delete({
      where: {
        id,
      },
    });

    return {
      success: "User deleted successful",
    };
  } catch (error) {
    console.log(error);
  }
};
