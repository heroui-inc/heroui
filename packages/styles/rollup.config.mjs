import fs from "fs";
import path from "path";

import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import {defineConfig} from "rollup";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

// Get all component directories
const componentDirs = fs.readdirSync("./src/components").filter((file) => {
  const fullPath = path.join("./src/components", file);

  return fs.statSync(fullPath).isDirectory() && fs.existsSync(path.join(fullPath, "index.ts"));
});

// Create individual entry points for each component
const componentEntries = componentDirs.reduce((acc, dir) => {
  acc[`components/${dir}/index`] = `src/components/${dir}/index.ts`;

  return acc;
}, {});

// All entry points
const input = {
  index: "src/index.ts",
  ...componentEntries,
};

const external = [
  ...Object.keys(packageJson.peerDependencies || {}),
  ...Object.keys(packageJson.dependencies || {}),
  /^tailwind-variants/,
];

const plugins = [
  peerDepsExternal(),
  resolve({
    extensions: [".js", ".ts"],
  }),
  typescript({
    declaration: false,
    exclude: ["node_modules", "dist"],
    tsconfig: "./tsconfig.json",
  }),
];

export default defineConfig({
  external,
  input,
  output: {
    dir: "dist",
    exports: "named",
    format: "es",
    hoistTransitiveImports: false,
    preserveModules: true,
    preserveModulesRoot: "src",
    sourcemap: false,
  },
  plugins,
  treeshake: {
    moduleSideEffects: false,
    propertyReadSideEffects: false,
  },
});
