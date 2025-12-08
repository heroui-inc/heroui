import path from "path";

import preset from "@heroui/standard/prettier/base.mjs";

/** @type {import("prettier").Config} */
const config = {
  ...preset,
  overrides: [
    {
      files: "./packages/styles/utilities/motions.css",
      options: {
        printWidth: 50,
      },
    },
  ],
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindAttributes: ["className", "classNames"],
  tailwindFunctions: ["tv", "clsx", "cn"],
  tailwindStylesheet: path.resolve(import.meta.dirname, "./packages/styles/index.css"),
};

export default config;
