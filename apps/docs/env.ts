import {createEnv} from "@t3-oss/env-nextjs";
import {z} from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_APP_ENV: z.enum(["production", "staging", "development"]).default("development"),
    NEXT_PUBLIC_IS_PREVIEW: z.coerce.boolean().default(false),
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_ENV: process.env["NEXT_PUBLIC_APP_ENV"],
    NEXT_PUBLIC_IS_PREVIEW: process.env["NEXT_PUBLIC_IS_PREVIEW"],
    NODE_ENV: process.env["NODE_ENV"],
    VERCEL_ENV: process.env["VERCEL_ENV"],
    VERCEL_PROJECT_PRODUCTION_URL: process.env["VERCEL_PROJECT_PRODUCTION_URL"],
    VERCEL_URL: process.env["VERCEL_URL"],
  },
  server: {
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    VERCEL_ENV: z.enum(["production", "preview", "development"]).default("development"),
    VERCEL_PROJECT_PRODUCTION_URL: z.string().default("localhost:3000"),
    VERCEL_URL: z.string().default("localhost:3000"),
  },
});
