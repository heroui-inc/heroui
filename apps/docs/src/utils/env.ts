export const __PROD__ = process.env.NODE_ENV === "production";
export const __DEV__ = process.env.NODE_ENV === "development";
export const __PREVIEW__ = process.env["IS_PREVIEW"] === "true";
