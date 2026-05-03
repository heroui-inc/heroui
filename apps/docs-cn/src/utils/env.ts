import {env} from "~env";

export const __IS_PRE_RELEASE__ = true;
export const __DEV__ = env.NEXT_PUBLIC_APP_ENV === "development";
export const __PREVIEW__ = env.NEXT_PUBLIC_APP_ENV === "preview";
export const __PROD__ = env.NEXT_PUBLIC_APP_ENV === "production";

const getBaseURL = (): URL => {
  // default - dev
  let host = "localhost:3000";

  // preview
  if (__PREVIEW__) host = "v3.heroui.com";

  // production
  if (__PROD__) host = "www.heroui.com";

  // protocol
  const protocol = host.startsWith("localhost") ? "http" : "https";

  return new URL(`${protocol}://${host}`);
};

export const __BASE_URL__ = getBaseURL();
export const __CDN_URL__ = env.NEXT_PUBLIC_CDN_URL;
