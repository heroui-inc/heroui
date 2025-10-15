import path from "path";
import {fileURLToPath} from "url";

import preset from "@heroui/standard/prettier/base.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import("prettier").Config} */
const config = {
  ...preset,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindAttributes: ["className", "classNames"],
  tailwindFunctions: ["tv", "clsx", "cn"],
  tailwindStylesheet: path.resolve(__dirname, "./packages/styles/index.css"),
};

export default config;
