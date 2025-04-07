import {defineConfig} from "eslint/config";
import globals from "globals";

import baseConfig from "./base.mjs";

export default defineConfig([
  ...baseConfig,
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ["**/__tests__/**/*"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
]);
