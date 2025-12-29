import {createAuthClient} from "better-auth/react";

export const authClient = createAuthClient({
  basePath: "/api/auth",
  baseURL: process.env["NEXT_PUBLIC_PLATFORM_API_URL"],
});
