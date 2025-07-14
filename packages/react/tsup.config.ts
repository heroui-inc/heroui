/* eslint-disable no-console */
import {glob} from "glob";
import {defineConfig} from "tsup";

import packageJSON from "./package.json";

// Get all TypeScript files except stories and tests
const getEntries = () => {
  const files = glob.sync("src/**/*.{ts,tsx}", {
    ignore: ["src/**/*.stories.tsx", "src/**/*.test.tsx", "src/**/*.d.ts"],
  });

  return files.reduce(
    (entries, file) => {
      // Create entry key based on file path
      const key = file.replace(/^src\//, "").replace(/\.(ts|tsx)$/, "");

      entries[key] = file;

      return entries;
    },
    {} as Record<string, string>,
  );
};

export default defineConfig([
  // JavaScript/TypeScript build
  {
    clean: true,
    dts: false,
    entry: getEntries(),
    external: [
      ...Object.keys(packageJSON.peerDependencies || {}),
      ...Object.keys(packageJSON.dependencies || {}),
    ],
    format: ["esm"],
    outDir: "dist",
    sourcemap: true,
    target: "esnext",
    splitting: false,
    bundle: false,
    treeshake: false,
    esbuildOptions(options) {
      options.preserveSymlinks = true;
    },
    onSuccess: async () => {
      console.log("JavaScript build completed!");
    },
  },
  // TypeScript declarations build
  {
    clean: false,
    dts: {
      only: true,
    },
    entry: getEntries(),
    outDir: "dist",
    onSuccess: async () => {
      console.log("TypeScript declarations generated!");
    },
  },
]);
