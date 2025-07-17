#!/usr/bin/env node
/* eslint-disable no-console */
import path from "path";
import {fileURLToPath} from "url";

import fs from "fs-extra";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

async function removeExports() {
  console.log("🔧 Removing exports from package.json...");

  const packageJsonPath = path.join(rootDir, "package.json");
  const packageJson = await fs.readJson(packageJsonPath);

  // Remove exports field
  if (packageJson.exports) {
    delete packageJson.exports;

    // Write updated package.json
    await fs.writeJson(packageJsonPath, packageJson, {spaces: 2});

    console.log("✅ Removed exports from package.json");
  } else {
    console.log("ℹ️  No exports field found in package.json");
  }
}

removeExports().catch((error) => {
  console.error("❌ Failed to remove exports:", error);
  process.exit(1);
});
