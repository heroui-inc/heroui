import preset from "@heroui/standard/prettier/base.mjs";

/** @type {import("prettier").Config} */
const config = {
  ...preset,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindAttributes: ["classNames"],
  tailwindFunctions: ["tv", "clsx", "cn"],
};

export default config;
