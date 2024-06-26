"use server";

import { db } from "@/utils/db";
import { User } from "next-auth";
import { z } from "zod";
import {
  forgotPasswordSchema,
  newPasswordSchema,
  signinSchema,
  signupSchema,
} from "@/lib/schemas";
import { getUserByEmail } from "./user";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { generateVerificationToken } from "./verification-token";
import { sendEmail, sendPasswordEmail } from "./email";
import { generateVerificationPasswordToken } from "./password-verification-token";

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

    const verificationToken = await generateVerificationToken(email);

    console.log(verificationToken);

    if (!verificationToken) {
      return {
        error: "Token generated failed",
      };
    }

    const send = await sendEmail({
      email,
      emailVerificationToken: verificationToken.token,
    });

    console.log(send);

    if (!send) {
      return {
        error: "Cannot send email",
      };
    }

    return {
      success: "User registered successful, please check your email!",
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

  if (!user.emailVerified) {
    return {
      error: "Please verified your email",
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

export const forgotPassword = async (
  values: z.infer<typeof forgotPasswordSchema>
) => {
  try {
    const validatedFields = forgotPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
      return {
        error: "Invalid fields!",
      };
    }

    const { email } = validatedFields.data;

    const user = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        error: "Email doesnt exist!",
      };
    }

    if (user && !user.emailVerified) {
      return {
        error: "Please verified your email!",
      };
    }

    const verificationToken = await generateVerificationPasswordToken(email);

    if (!verificationToken) {
      return {
        error: "Token generated failed",
      };
    }

    const send = await sendPasswordEmail({
      email,
      emailVerificationToken: verificationToken.token,
    });

    console.log(send);

    return {
      success:
        "Token new password generate successful, please check your email!",
    };
  } catch (error) {
    console.log(error);
  }
};

export const newPassword = async (
  email: string,
  values: z.infer<typeof newPasswordSchema>
) => {
  try {
    const validatedFields = newPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
      return {
        error: "Invalid fields!",
      };
    }

    const { password } = validatedFields.data;

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        error: "User doesnt exist!",
      };
    }

    const passwordCompare = await bcrypt.compare(password, user.password!);

    if (passwordCompare) {
      return {
        error: "New password cannot same as old password!",
      };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await db.user.update({
      where: {
        email,
      },
      data: {
        password: passwordHash,
      },
    });

    await db.verificationPasswordToken.delete({
      where: {
        email,
      },
    });

    return {
      success: "New password has been updated",
    };
  } catch (error) {
    console.log(error);
  }
};
