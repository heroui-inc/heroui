#!/usr/bin/env tsx
/* eslint-disable no-console */

import {execSync} from "child_process";
import path from "path";

import fs from "fs-extra";
import {glob} from "glob";

const ROOT_DIR = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT_DIR, "src");
const DIST_DIR = path.join(ROOT_DIR, "dist");

// Clean dist directory
console.log("Cleaning dist directory...");
fs.removeSync(DIST_DIR);

// Get all TypeScript files except stories and tests
const files = glob.sync("**/*.{ts,tsx}", {
  cwd: SRC_DIR,
  ignore: ["**/*.stories.tsx", "**/*.test.tsx", "**/*.d.ts"],
});

// Build each file individually using esbuild
console.log("Building files...");
files.forEach((file) => {
  const srcPath = path.join(SRC_DIR, file);
  const distPath = path.join(DIST_DIR, file.replace(/\.(ts|tsx)$/, ".js"));
  const distDir = path.dirname(distPath);

  // Ensure directory exists
  fs.ensureDirSync(distDir);

  // Read source file
  const content = fs.readFileSync(srcPath, "utf-8");

  // Check if file has "use client" directive
  const hasUseClient = content.startsWith('"use client"');

  // Build with esbuild
  const buildCommand = `npx esbuild "${srcPath}" --format=esm --target=esnext --external:react --external:react-dom --external:react-aria-components --external:@radix-ui/* --external:tailwind-* --external:@internationalized/* --external:input-otp --external:fs --external:path --external:url --outfile="${distPath}"`;

  try {
    execSync(buildCommand, {stdio: "pipe"});

    // If file had "use client", ensure it's preserved
    if (hasUseClient) {
      const builtContent = fs.readFileSync(distPath, "utf-8");

      if (!builtContent.startsWith('"use client"')) {
        fs.writeFileSync(distPath, `"use client";\n${builtContent}`);
      }
    }
  } catch (error) {
    console.error(`Failed to build ${file}:`, error);
  }
});

// Generate TypeScript declarations
console.log("Generating TypeScript declarations...");
execSync("npx tsc --emitDeclarationOnly --declaration --outDir dist", {
  cwd: ROOT_DIR,
  stdio: "inherit",
});

// Update package.json exports
console.log("Updating package.json exports...");
const packageJson = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, "package.json"), "utf-8"));

// Generate exports map
const exports = {
  ".": {
    types: "./dist/index.d.ts",
    import: "./dist/index.js",
    default: "./dist/index.js",
  },
  "./index.css": "./index.css",
};

// Add component exports
const componentDirs = glob.sync("components/*/", {cwd: SRC_DIR});

componentDirs.forEach((dir) => {
  const componentName = path.basename(dir);

  exports[`./components/${componentName}`] = {
    types: `./dist/components/${componentName}/index.d.ts`,
    import: `./dist/components/${componentName}/index.js`,
    default: `./dist/components/${componentName}/index.js`,
  };
});

packageJson.exports = exports;
fs.writeJsonSync(path.join(ROOT_DIR, "package.json"), packageJson, {spaces: 2});

console.log("Build completed successfully!");
