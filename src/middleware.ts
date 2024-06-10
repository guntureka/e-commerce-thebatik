import { auth } from "./auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const user = req.auth?.user;

  console.log(user);

  //   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  //   const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  //   const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  //   const isAdminRoute = nextUrl.pathname.startsWith(adminPrefix);

  //   if (isApiAuthRoute) {
  //     return;
  //   }

  //   if (isAuthRoute) {
  //     if (isLoggedIn) {
  //       return; // redirect
  //     }
  //   }

  //   if (!isLoggedIn && !isPublicRoute) {
  //     return; // redirect to login
  //   }

  //   if (isAdminRoute && user?.role !== "ADMIN") {
  //     return; // redirect to /
  //   }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
