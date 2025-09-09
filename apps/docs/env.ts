import {createEnv} from "@t3-oss/env-nextjs";
import {z} from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_APP_ENV: z.enum(["production", "preview", "development"]).default("development"),
    NEXT_PUBLIC_CDN_URL: z.url().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_ENV: process.env["NEXT_PUBLIC_APP_ENV"],
    NEXT_PUBLIC_CDN_URL: process.env["NEXT_PUBLIC_CDN_URL"],
    NODE_ENV: process.env["NODE_ENV"],
  },
  server: {
    NODE_ENV: z.enum(["development", "production"]).default("development"),
  },
});
