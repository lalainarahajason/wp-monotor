/**
 * An array of routes accessible to the public
 * These routes do not require auth authentication
 * @type {string[]}
 */
export const PublicRoutes = [
    "/"
]

/**
 * An array of routes for authentication
 * These routes will redirect logged in users to settings
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register"
]

export const apiAuthPrefix = "/api/auth"