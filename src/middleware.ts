import { auth } from "@/auth";
import {
  adminRoutes,
  apiAuthPrefix,
  apiTestPrefix,
  authRoutes,
  publicRoutes,
} from "./utils/routes";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const user = req.auth?.user;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = nextUrl.pathname.startsWith(adminRoutes);
  // const isTestRoute = nextUrl.pathname.startsWith(apiTestPrefix);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/", nextUrl));
    }

    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/sign-in", nextUrl));
  }

  if (isAdminRoute && user?.role !== "ADMIN") {
    return Response.redirect(new URL("/", nextUrl));
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
