#!/usr/bin/env node
/* eslint-disable no-console */
import path from "path";
import {fileURLToPath} from "url";

import fs from "fs-extra";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const PACKAGE_JSON_PATH = path.join(rootDir, "package.json");
const COMPONENTS_DIR = path.join(rootDir, "src/components");

/** Directories to skip when scanning components */
const SKIP_DIRS = new Set(["icons", "utils", "hooks"]);

/**
 * Scan the components directory and return sorted component names
 * that have an index.ts file.
 */
async function scanComponents() {
  if (!(await fs.pathExists(COMPONENTS_DIR))) {
    console.warn("⚠️  Components directory not found:", COMPONENTS_DIR);

    return [];
  }

  const items = await fs.readdir(COMPONENTS_DIR);
  const components = [];

  for (const item of items) {
    if (SKIP_DIRS.has(item)) continue;

    const itemPath = path.join(COMPONENTS_DIR, item);
    const stat = await fs.stat(itemPath);

    if (stat.isDirectory() && (await fs.pathExists(path.join(itemPath, "index.ts")))) {
      components.push(item);
    } else if (stat.isDirectory()) {
      console.warn(`⚠️  Skipping ${item}: index.ts not found`);
    }
  }

  return components.sort();
}

/**
 * Generate component exports and write them to package.json.
 * Called after clean-package has already backed up and cleaned the file.
 */
async function generateExports() {
  const packageJson = await fs.readJson(PACKAGE_JSON_PATH);
  const components = await scanComponents();

  console.log(`📦 Found ${components.length} components`);

  const exports = {
    ".": {
      import: "./dist/index.js",
      types: "./dist/index.d.ts",
    },
    "./package.json": "./package.json",
    "./styles": {
      default: "./dist/styles.css",
      style: "./dist/styles.css",
    },
  };

  for (const name of components) {
    exports[`./${name}`] = {
      import: `./dist/components/${name}/index.js`,
      types: `./dist/components/${name}/index.d.ts`,
    };
  }

  packageJson.exports = exports;

  await fs.writeJson(PACKAGE_JSON_PATH, packageJson, {spaces: 2});
  console.log(`✅ Updated package.json exports (${components.length} components)`);
}

generateExports().catch((error) => {
  console.error("❌ Failed:", error);
  process.exit(1);
});
