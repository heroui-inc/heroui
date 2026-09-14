import baseReactConfig from "@heroui/standard/eslint/next.mjs";
import {defineConfig} from "eslint/config";

const config = defineConfig([
  ...baseReactConfig,
  {
    // The shared base sets `typescript: true`, which discovers tsconfig from
    // process.cwd(). The `@/*` aliases therefore resolved when eslint ran from
    // apps/docs but not when lint-staged ran it from the repo root, so import/order
    // classified aliased imports into different groups and the two produced
    // contradictory autofixes. Pin the project path so resolution is cwd-independent.
    settings: {
      "import/resolver": {
        node: true,
        typescript: {
          project: new URL("./tsconfig.json", import.meta.url).pathname,
        },
      },
    },
  },
]);

export default config;
