import { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { signinSchema } from "@/lib/schemas";
import { getUserByEmail } from "@/actions/user";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = await signinSchema.safeParseAsync(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user) {
            return null;
          }

          return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
