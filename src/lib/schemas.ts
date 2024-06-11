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
    firstName: z.string().min(8, {
      message: "Minimum 8 character required!",
    }),
    lastName: z.string(),
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
