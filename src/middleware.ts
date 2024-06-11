import { auth } from "./auth";
import {
  authRoutes,
  publicRoutes,
  apiAuthPrefix,
  adminRoutes,
  apiTestPrefix,
} from "./utils/routes";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const user = req.auth?.user;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isTestRoute = nextUrl.pathname.startsWith(apiTestPrefix);
  const isAdminRoute = nextUrl.pathname.startsWith(adminRoutes);

  if (isApiAuthRoute) {
    return;
  }
  if (isTestRoute) {
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
    return; // redirect to /
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
