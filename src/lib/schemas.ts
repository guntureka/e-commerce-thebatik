import { TransactionStatus, UserRole } from "@prisma/client";
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

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email!").min(1, "Email required!"),
});

export const newPasswordSchema = z
  .object({
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

export const categorySchema = z.object({
  name: z.string().min(1, "Name required!"),
  description: z.string().optional(),
});

export const imageSchema = z
  .instanceof(File)
  .refine(
    (file) => file.size < 4 * 1024 * 1024,
    "Image must not be larger than 4MB"
  )
  .refine(
    (file) => file.type.includes("image/*"),
    "File must be an image format"
  );

export const productSchema = z.object({
  name: z.string().min(1, "Name required!"),
  description: z.string().optional(),
  discount: z.coerce.number(),
  price: z.coerce.number(),
  quantity: z.coerce.number(),
  sizes: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  images: z.array(z.string()).optional(),
  categoryId: z.string().min(1, "Category required"),
  // colors: z.array(z.string()),
});

export const userSchema = z
  .object({
    name: z.string(),
    email: z.string().email({
      message: "Invalid email!",
    }),
    password: z.string().min(8, {
      message: "Minimum 8 character required!",
    }),
    role: z.nativeEnum(UserRole),
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

export const transactionStatusSchema = z.object({
  transactionStatus: z.nativeEnum(TransactionStatus),
});
