import NextAuth from "next-auth";
import authConfig from "@/utils/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/utils/db";
import { updateUserLinkedAccount } from "./actions/auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ user, token }) {
      if (!token.sub || !user) {
        return token;
      }
      token.sub = user.id;
      token.role = user.role;

      return token;
    },

    async session({ token, session }) {
      if (!token.sub || !session.user) {
        return session;
      }

      session.user.id = token.sub;
      session.user.role = token.role;

      return session;
    },
  },
  events: {
    async linkAccount({ user }) {
      await updateUserLinkedAccount(user);
    },
  },
  ...authConfig,
});
