/**
 * Array of public routes.
 * These routes are accessible to all users.
 * @type {string[]}
 */
export const publicRoutes: string[] = ["/", "/products", "/about-us"];
/**
 * Array of authentication routes.
 * @type {string[]}
 */
export const authRoutes: string[] = ["/sign-in", "sign-up"];
/**
 * The prefix for API authentication routes.
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";
/**
 * The prefix for admin routes.
 */
export const adminPrefix: string = "/admin";

/**
 * The default URL for the application.
 */
export const DEFAULT_URL: string = "/";
