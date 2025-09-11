import {createEnv} from "@t3-oss/env-nextjs";
import {z} from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_APP_ENV: z.enum(["production", "preview", "development"]).default("development"),
    NEXT_PUBLIC_CDN_URL: z.url().min(1),
  },
  runtimeEnv: {
    LOOPS_API_ENDPOINT: process.env["LOOPS_API_ENDPOINT"],
    LOOPS_API_KEY: process.env["LOOPS_API_KEY"],
    NEXT_PUBLIC_APP_ENV: process.env["NEXT_PUBLIC_APP_ENV"],
    NEXT_PUBLIC_CDN_URL: process.env["NEXT_PUBLIC_CDN_URL"],
    NODE_ENV: process.env["NODE_ENV"],
  },
  server: {
    LOOPS_API_ENDPOINT: z.string().min(1),
    LOOPS_API_KEY: z.string().min(1),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
  },
});
