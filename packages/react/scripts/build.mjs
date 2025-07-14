/* eslint-disable no-console */
import {execSync} from "child_process";
import path from "path";
import {fileURLToPath} from "url";

import fs from "fs-extra";

import {generateTypes} from "./build-types.mjs";
import {generateThemes} from "./generate-themes.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

async function clean() {
  console.log("🧹 Cleaning dist directory...");
  await fs.remove(distDir);
}

async function build() {
  console.log("📦 Building with Rollup...");
  execSync("rollup -c rollup.config.mjs", {stdio: "inherit", cwd: rootDir});
}

async function generateExports() {
  console.log("🔧 Generating package.json exports...");

  const packageJsonPath = path.join(rootDir, "package.json");
  const packageJson = await fs.readJson(packageJsonPath);

  const exports = {
    ".": {
      import: "./dist/index.js",
      types: "./dist/index.d.ts",
    },
    "./plugin": "./dist/plugin.js",
    "./theme": "./dist/theme.js",
    "./package.json": "./package.json",
  };

  // Update package.json
  packageJson.exports = exports;
  packageJson.main = "./dist/index.js";
  packageJson.module = "./dist/index.js";
  packageJson.types = "./dist/index.d.ts";
  packageJson.type = "module";
  packageJson.sideEffects = ["*.css"];

  // Write updated package.json
  await fs.writeJson(packageJsonPath, packageJson, {spaces: 2});

  console.log(`✅ Generated ${Object.keys(exports).length} exports`);
}

async function addUseClientDirective() {
  console.log('🔧 Adding "use client" directives...');

  // Find all JS files in the components directory
  const componentFiles = [];
  const componentsDir = path.join(distDir, "components");

  async function findComponentFiles(dir) {
    const items = await fs.readdir(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = await fs.stat(fullPath);

      if (stat.isDirectory()) {
        await findComponentFiles(fullPath);
      } else if (item.endsWith(".js")) {
        componentFiles.push(fullPath);
      }
    }
  }

  if (await fs.pathExists(componentsDir)) {
    await findComponentFiles(componentsDir);
  }

  // Add "use client" to the beginning of each component file
  for (const file of componentFiles) {
    const content = await fs.readFile(file, "utf-8");

    if (!content.startsWith('"use client"') && !content.startsWith("'use client'")) {
      await fs.writeFile(file, `"use client";\n${content}`);
    }
  }

  // Also add to specific files that need it
  const otherClientFiles = [
    path.join(distDir, "hooks/index.js"),
    path.join(distDir, "hooks/use-measured-height.js"),
    path.join(distDir, "theme/index.js"),
    path.join(distDir, "theme/themes.js"),
    path.join(distDir, "utils/compose.js"),
    path.join(distDir, "utils/mergeRef.js"),
  ];

  for (const file of otherClientFiles) {
    if (await fs.pathExists(file)) {
      const content = await fs.readFile(file, "utf-8");

      if (!content.startsWith('"use client"') && !content.startsWith("'use client'")) {
        await fs.writeFile(file, `"use client";\n${content}`);
      }
    }
  }

  console.log(`✅ Added "use client" to ${componentFiles.length} component files`);
}

async function copyThemes() {
  console.log("🎨 Copying theme files...");

  // Copy theme CSS files
  const themesDir = path.join(rootDir, "src/themes");
  const distThemesDir = path.join(distDir, "themes");

  await fs.ensureDir(distThemesDir);

  const themeFiles = await fs.readdir(themesDir);

  for (const file of themeFiles) {
    if (file.endsWith(".css")) {
      await fs.copy(path.join(themesDir, file), path.join(distThemesDir, file));
    }
  }
}

async function copyStaticFiles() {
  console.log("📄 Copying static files...");

  // Copy index.css to dist
  const indexCssPath = path.join(rootDir, "index.css");

  if (await fs.pathExists(indexCssPath)) {
    await fs.copy(indexCssPath, path.join(distDir, "index.css"));
  }

  // Don't copy README files to dist - they belong in the package root
}

async function main() {
  try {
    await clean();
    await generateThemes(); // Generate themes before build
    await build();
    await generateTypes();
    await addUseClientDirective();
    await copyThemes();
    await copyStaticFiles();
    await generateExports();

    console.log("✨ Build completed successfully!");
  } catch (error) {
    console.error("❌ Build failed:", error);
    process.exit(1);
  }
}

main();
