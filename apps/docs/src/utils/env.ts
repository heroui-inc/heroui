import {env} from "~env";

export const __IS_PRE_RELEASE__ = true;
export const __DEV__ = env.NEXT_PUBLIC_APP_ENV === "development";
export const __PREVIEW__ = env.NEXT_PUBLIC_APP_ENV === "preview";
export const __PROD__ = env.NEXT_PUBLIC_APP_ENV === "production";

const getBaseURL = (): URL => {
  const [vercelURL, branchURL, productionURL] = env.NEXT_PUBLIC_BASE_DOMAIN_NAME?.split(",") ?? [];

  // default
  let host = "localhost:3000";

  // dev
  if (__DEV__ && vercelURL) {
    host = vercelURL;
  }

  // preview
  if (__PREVIEW__) {
    // vercel url takes precedence
    if (vercelURL) host = vercelURL;
    // branch url will override if present
    if (branchURL) host = branchURL;
    // production url will override if present
    // @see https://vercel.com/docs/environment-variables/system-environment-variables#VERCEL_PROJECT_PRODUCTION_URL
    if (productionURL) host = productionURL;
  }

  // production on vercel
  if (__PROD__ && productionURL) {
    host = productionURL;
  }

  // protocol
  const protocol = host.startsWith("localhost") ? "http" : "https";

  // Local build/run stays localhost: __DEV__, __PROD__, __PREVIEW__
  return new URL(`${protocol}://${host}`);
};

export const __BASE_URL__ = getBaseURL();
export const __CDN_URL__ = env.NEXT_PUBLIC_CDN_URL;
