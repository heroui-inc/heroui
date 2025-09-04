import {env} from "~env";

export const __PROD__ = env.NEXT_PUBLIC_APP_ENV === "production";
export const __DEV__ = env.NEXT_PUBLIC_APP_ENV === "development";
export const __PREVIEW__ = env.NEXT_PUBLIC_IS_PREVIEW;

export const getBaseURL = (): URL => {
  // Default to localhost
  let host = "localhost:3000";

  // Dev on vercel
  if (env.VERCEL_ENV === "development" && env.VERCEL_URL && !__DEV__) {
    host = env.VERCEL_URL;
  }

  // Preview on vercel
  if (env.VERCEL_ENV === "preview" && env.VERCEL_URL && !__DEV__) {
    host = env.VERCEL_URL;
  }

  // Production on vercel
  if (env.VERCEL_ENV === "production" && env.VERCEL_PROJECT_PRODUCTION_URL && !__PROD__) {
    host = env.VERCEL_PROJECT_PRODUCTION_URL;
  }

  // Add protocol
  const protocol = host.startsWith("localhost") ? "http" : "https";

  // Local build/run stays localhost: __DEV__, __PROD__, __PREVIEW__
  return new URL(`${protocol}://${host}`);
};
