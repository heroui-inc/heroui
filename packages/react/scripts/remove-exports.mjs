#!/usr/bin/env node
/* eslint-disable no-console */
import path from "path";
import {fileURLToPath} from "url";

import fs from "fs-extra";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

async function removeExports() {
  console.log("🔧 Restoring base exports in package.json...");

  const packageJsonPath = path.join(rootDir, "package.json");
  const packageJson = await fs.readJson(packageJsonPath);

  // Restore base exports only (remove component exports)
  const baseExports = {
    ".": {
      import: "./src/index.ts",
    },
    "./plugin": "./src/plugin.ts",
    "./package.json": "./package.json",
  };

  packageJson.exports = baseExports;

  // Write updated package.json
  await fs.writeJson(packageJsonPath, packageJson, {spaces: 2});

  console.log("✅ Restored base exports in package.json");
}

removeExports().catch((error) => {
  console.error("❌ Failed to remove exports:", error);
  process.exit(1);
});
