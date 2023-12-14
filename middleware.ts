// applies next auth to all pages
export { default } from "next-auth/middleware";

// applies next auth only to matching routes
export const config = { matcher: ["/hidden"] };