import {createEnv} from "@t3-oss/env-nextjs";
import {z} from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_APP_ENV: z.enum(["production", "preview", "development"]).default("development"),
    NEXT_PUBLIC_CDN_URL: z.url().min(1),
    NEXT_PUBLIC_HEROUI_PRO_URL: z.url().min(1).optional(),
    NEXT_PUBLIC_POSTHOG_HOST: z.url().min(1).optional(),
    NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1).optional(),
    NEXT_PUBLIC_PRO_API_URL: z.url().min(1).optional(),
    NEXT_PUBLIC_SHOW_PRE_SALE_BANNER: z
      .enum(["true", "false"])
      .default("false")
      .transform((v) => v === "true"),
  },
  runtimeEnv: {
    FEATUREBASE_API_ENDPOINT: process.env["FEATUREBASE_API_ENDPOINT"],
    FEATUREBASE_API_KEY: process.env["FEATUREBASE_API_KEY"],
    LOOPS_API_ENDPOINT: process.env["LOOPS_API_ENDPOINT"],
    LOOPS_API_KEY: process.env["LOOPS_API_KEY"],
    NEXT_PUBLIC_APP_ENV: process.env["NEXT_PUBLIC_APP_ENV"],
    NEXT_PUBLIC_CDN_URL: process.env["NEXT_PUBLIC_CDN_URL"],
    NEXT_PUBLIC_HEROUI_PRO_URL: process.env["NEXT_PUBLIC_HEROUI_PRO_URL"],
    NEXT_PUBLIC_POSTHOG_HOST: process.env["NEXT_PUBLIC_POSTHOG_HOST"],
    NEXT_PUBLIC_POSTHOG_KEY: process.env["NEXT_PUBLIC_POSTHOG_KEY"],
    NEXT_PUBLIC_PRO_API_URL: process.env["NEXT_PUBLIC_PRO_API_URL"],
    NEXT_PUBLIC_SHOW_PRE_SALE_BANNER: process.env["NEXT_PUBLIC_SHOW_PRE_SALE_BANNER"],
    NODE_ENV: process.env["NODE_ENV"],
  },
  server: {
    FEATUREBASE_API_ENDPOINT: z.string().min(1),
    FEATUREBASE_API_KEY: z.string().min(1),
    LOOPS_API_ENDPOINT: z.string().min(1),
    LOOPS_API_KEY: z.string().min(1),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
  },
});
