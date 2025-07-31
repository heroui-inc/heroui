import fs from "fs";
import path from "path";

import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import {defineConfig} from "rollup";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";

const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

// Custom plugin to replace version placeholder
const replaceVersion = () => ({
  name: "replace-version",
  transform(code, id) {
    if (id.includes("version.ts") || id.includes("version.js")) {
      return code.replace("__HEROUI_VERSION__", packageJson.version);
    }

    return null;
  },
});

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
  replaceVersion(),
  babel({
    babelHelpers: "bundled",
    exclude: "node_modules/**",
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    presets: [["@babel/preset-react", {runtime: "automatic"}], "@babel/preset-typescript"],
  }),
  postcss({
    extract: true,
    minimize: true,
    modules: false,
  }),
];

export default defineConfig({
  external,
  input,
  onwarn(warning, warn) {
    // Ignore "use client" directive warnings
    if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
      return;
    }
    warn(warning);
  },
  output: {
    dir: "dist",
    // Disable sourcemaps
    // Optimize for tree shaking
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
