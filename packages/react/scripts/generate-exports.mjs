#!/usr/bin/env node
/* eslint-disable no-console */
import path from "path";
import {fileURLToPath} from "url";

import fs from "fs-extra";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

async function generateExports() {
  console.log("🔧 Generating exports for package.json...");

  const packageJsonPath = path.join(rootDir, "package.json");
  const packageJson = await fs.readJson(packageJsonPath);

  // Start with base exports
  const exports = {
    ".": {
      import: "./dist/index.js",
      types: "./dist/index.d.ts",
    },
    "./plugin": "./dist/plugin.js",
    "./package.json": "./package.json",
  };

  // Read components directory
  const componentsDir = path.join(rootDir, "src/components");

  if (await fs.pathExists(componentsDir)) {
    const items = await fs.readdir(componentsDir);

    for (const item of items) {
      const itemPath = path.join(componentsDir, item);
      const stat = await fs.stat(itemPath);

      // Check if it's a directory with an index.ts file
      if (stat.isDirectory() && (await fs.pathExists(path.join(itemPath, "index.ts")))) {
        // Skip special directories
        if (item === "icons" || item === "utils" || item === "hooks") {
          continue;
        }

        // Add export for this component
        exports[`./${item}`] = {
          import: `./dist/components/${item}/index.js`,
          types: `./dist/components/${item}/index.d.ts`,
        };
      }
    }
  }

  // Sort exports for consistency
  const sortedExports = {};
  const baseKeys = [".", "./plugin", "./package.json"];
  const componentKeys = Object.keys(exports)
    .filter((key) => !baseKeys.includes(key))
    .sort();

  // Add base exports first
  for (const key of baseKeys) {
    if (exports[key]) {
      sortedExports[key] = exports[key];
    }
  }

  // Then add component exports alphabetically
  for (const key of componentKeys) {
    sortedExports[key] = exports[key];
  }

  // Add exports to package.json
  packageJson.exports = sortedExports;

  // Write updated package.json
  await fs.writeJson(packageJsonPath, packageJson, {spaces: 2});

  console.log(
    `✅ Generated ${Object.keys(sortedExports).length} exports (${componentKeys.length} components)`,
  );
}

generateExports().catch((error) => {
  console.error("❌ Failed to generate exports:", error);
  process.exit(1);
});
