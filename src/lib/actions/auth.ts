"use server";

import { db } from "@/utils/db";
import { User } from "next-auth";
import { z } from "zod";
import { signinSchema, signupSchema } from "@/lib/schemas";
import { getUserByEmail } from "./user";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";

export const updateUserLinkedAccount = async (user: User) => {
  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      emailVerified: new Date(),
    },
  });
};

export const signupAuth = async (values: z.infer<typeof signupSchema>) => {
  const validatedFields = await signupSchema.safeParseAsync(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { name, email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      error: "Email already exist!",
    };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    await db.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
    });

    return {
      success: "User registered successful",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong!",
    };
  }
};

export const signinAuth = async (values: z.infer<typeof signinSchema>) => {
  const validatedFields = signinSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { email, password } = validatedFields.data;

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return {
      error: "User do not exist!",
    };
  }

  const passwordCompare = await bcrypt.compare(password, user.password!);

  if (!passwordCompare) {
    return {
      error: "Wrong password!",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return {
      success: "Signin successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong!",
    };
   
  }
};
