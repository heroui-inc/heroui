import fs from "fs";
import path from "path";

import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import {defineConfig} from "rollup";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";

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
  /^react($|\/)/,
  /^react-dom($|\/)/,
  /^@react-aria/,
  /^@react-stately/,
  /^tailwind-merge/,
  /^tailwind-variants/,
];

const plugins = [
  peerDepsExternal(),
  resolve({
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  }),
  babel({
    babelHelpers: "bundled",
    presets: [["@babel/preset-react", {runtime: "automatic"}], "@babel/preset-typescript"],
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    exclude: "node_modules/**",
  }),
  postcss({
    extract: true,
    minimize: true,
    modules: false,
  }),
];

export default defineConfig([
  // Main build for React components
  {
    input,
    output: {
      dir: "dist",
      format: "es",
      preserveModules: true,
      preserveModulesRoot: "src",
      sourcemap: false, // Disable sourcemaps
      // Optimize for tree shaking
      exports: "named",
      hoistTransitiveImports: false,
    },
    external,
    plugins,
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
    },
    onwarn(warning, warn) {
      // Ignore "use client" directive warnings
      if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
        return;
      }
      warn(warning);
    },
  },
  // Plugin build (bundled)
  {
    input: "src/plugin.ts",
    output: {
      file: "dist/plugin.js",
      format: "es",
      sourcemap: false, // Disable sourcemaps
    },
    external: [],
    plugins,
  },
]);
