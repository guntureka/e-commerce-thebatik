import { db } from "@/utils/db";
import { User } from "next-auth";
import { z } from "zod";
import { signupSchema } from "../lib/schemas";
import { getUserByEmail } from "./user";
import bcrypt from "bcryptjs";

export const updateUserLinkedAccount = async (user: User) => {
  if (user.name) {
    const name = user.name.split(" ");
    const [firstName, ...lastName] = name;

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailVerified: new Date(),
        firstName: firstName,
        lastName: lastName.join(" "),
      },
    });
  }
};

// export const signupAuth = async (values: z.infer<typeof signupSchema>) => {
export const signupAuth = async (values: z.infer<typeof signupSchema>) => {
  const validatedFields = await signupSchema.safeParseAsync(values);

  if (validatedFields.success) {
    const { firstName, lastName, password, email, confirmPassword } =
      validatedFields.data;

    const name = firstName.concat(lastName);

    const user = await getUserByEmail(email);

    if (user) {
      return null; // error message
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const res = await db.user.create({
      data: {
        name: name,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: passwordHash,
      },
    });

    return res;
  }

  return validatedFields.error;
};
