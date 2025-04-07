import {defineConfig} from "tsup";

import packageJSON from "./package.json";

export default defineConfig({
  clean: true,
  dts: true,
  entry: ["src/index.ts", "!src/**/*.stories.tsx", "!src/**/*.test.tsx"],
  external: Object.keys(packageJSON.peerDependencies || {}),
  format: "esm",
  outDir: "dist",
  sourcemap: true,
  target: "es2019",
  treeshake: true,
});
