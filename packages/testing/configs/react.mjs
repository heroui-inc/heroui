import {dirname, join} from "node:path";
import {fileURLToPath} from "node:url";

import {defineConfig, mergeConfig} from "vitest/config";

import {baseConfig} from "./base.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const setupFile = join(__dirname, "../setup/react.ts");

/** jsdom defaults for React UI packages. */
export const uiConfig = mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      globals: true,
      passWithNoTests: true,
      setupFiles: [setupFile],
    },
  }),
);
