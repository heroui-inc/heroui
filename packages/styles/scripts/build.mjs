#!/usr/bin/env node
/* eslint-disable no-console */
import {execSync} from "child_process";
import path from "path";
import {fileURLToPath} from "url";

import fs from "fs-extra";

import {rewriteDeclarationImports} from "../../../scripts/rewrite-declaration-imports.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

async function clean() {
  console.log("🧹 Cleaning dist directory...");
  await fs.remove(distDir);
}

async function build() {
  console.log("📦 Building with Rollup...");
  execSync("rollup -c rollup.config.mjs", {cwd: rootDir, stdio: "inherit"});
}

async function generateTypes() {
  console.log("📝 Generating TypeScript declarations...");
  execSync("tsc --emitDeclarationOnly", {cwd: rootDir, stdio: "inherit"});
  await rewriteDeclarationImports(distDir, {log: console.log});
  console.log("✅ TypeScript declarations generated");
}

async function copyCss() {
  console.log("🎨 Copying CSS files...");
  execSync("node scripts/copy-css.mjs", {cwd: rootDir, stdio: "inherit"});
}

async function minifyCss() {
  console.log("🗜️  Minifying CSS...");
  execSync("npx @tailwindcss/cli -i ./dist/index.css -o dist/heroui.min.css --minify", {
    cwd: rootDir,
    stdio: "inherit",
  });
}

async function main() {
  try {
    // Check if --tsc flag is passed
    const shouldGenerateTypes = process.argv.includes("--tsc");

    await clean();
    await build();

    if (shouldGenerateTypes) {
      await generateTypes();
    } else {
      console.log("⚡ Skipping TypeScript generation (use --tsc to include)");
    }

    await copyCss();
    await minifyCss();

    console.log("✨ Build completed successfully!");
  } catch (error) {
    console.error("❌ Build failed:", error);
    process.exit(1);
  }
}

main();
