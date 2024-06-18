import { UserRole } from "@prisma/client";
import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email({
    message: "Invalid email!",
  }),
  password: z.string().min(1, {
    message: "Password required!",
  }),
});

export const signupSchema = z
  .object({
    name: z.string().min(8, {
      message: "Minimum 8 character required!",
    }),
    email: z.string().email({
      message: "Invalid email!",
    }),
    password: z.string().min(8, {
      message: "Minimum 8 character required!",
    }),
    confirmPassword: z.string().min(8, {
      message: "Minimum 8 character required!",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match!",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      const hasNumber = /\d/.test(data.password);
      const hasLowercase = /[a-z]/.test(data.password);
      const hasUppercase = /[A-Z]/.test(data.password);
      const hasSymbol = /\W|_/.test(data.password);

      return hasNumber && hasLowercase && hasUppercase && hasSymbol;
    },
    {
      message:
        "Password must contain a number, a lowercase letter, an uppercase letter, and a symbol.",
      path: ["password"],
    }
  );

export const userSchema = z.object({
  name: z.string().min(8, {
    message: "Minimum 8 character required!",
  }),
  role: z.nativeEnum(UserRole),
  email: z.string().email({
    message: "Invalid email!",
  }),
});

export const categorySchema = z.object({
  name: z.string().min(1, {
    message: "Name required!",
  }),
  description: z.string(),
});

export const productSchema = z.object({
  categoryId: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number().multipleOf(0.01),
  discount: z.number().multipleOf(0.01).optional(),
  quantity: z.number(),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  images: z.array(z.string()),
});

export const cartSchema = z.object({
  quantity: z.number(),
  userId: z.string(),
  productId: z.string(),
});

export const wishlistSchema = z.object({
  quantity: z.number(),
  userId: z.string(),
  productId: z.string(),
});

export const addressSchema = z.object({
  name: z.string(),
  street: z.string(),
  city: z.string(),
  province: z.string(),
  country: z.string(),
  postalCode: z.string(),
  isUse: z.boolean(),
  userId: z.string(),
});

export const transactionSchema = z.object({
  userId: z.string(),
  total: z.number(),
  product: z.array(z.string()),
});
