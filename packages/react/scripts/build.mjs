/* eslint-disable no-console */
import {execSync} from "child_process";
import path from "path";
import {fileURLToPath} from "url";
import zlib from "zlib";

import fs from "fs-extra";

import {generateTypes} from "./generate-types.mjs";

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

async function logComponentCount() {
  console.log("📊 Counting components...");

  const componentsDir = path.join(rootDir, "src/components");
  let componentCount = 0;

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
        componentCount++;
      }
    }
  }

  console.log(`✅ Found ${componentCount} components`);
  console.log(`   Note: Component exports will be generated during 'pnpm pack' via clean-package`);
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

  console.log(`✅ Added "use client" to ${componentFiles.length} component files`);
}

async function measureBundleSizes() {
  console.log("📊 Measuring bundle sizes...");

  const sizes = {
    total: {min: 0, gzip: 0},
    main: {},
    plugin: {},
    components: {},
    css: {},
  };

  // Helper function to measure file size
  async function measureFile(filePath) {
    if (!(await fs.pathExists(filePath))) {
      return null;
    }

    const content = await fs.readFile(filePath);
    const minSize = Buffer.byteLength(content) / 1000;
    const gzipSize = zlib.gzipSync(content, {level: 9}).length / 1000;

    return {
      min: minSize.toFixed(2),
      gzip: gzipSize.toFixed(2),
    };
  }

  // Measure main bundle
  const mainPath = path.join(distDir, "index.js");
  const mainSize = await measureFile(mainPath);

  if (mainSize) {
    sizes.main = mainSize;
    sizes.total.min += parseFloat(mainSize.min);
    sizes.total.gzip += parseFloat(mainSize.gzip);
  }

  // Measure plugin bundle
  const pluginPath = path.join(distDir, "plugin.js");
  const pluginSize = await measureFile(pluginPath);

  if (pluginSize) {
    sizes.plugin = pluginSize;
    sizes.total.min += parseFloat(pluginSize.min);
    sizes.total.gzip += parseFloat(pluginSize.gzip);
  }

  // Measure individual components
  const componentsDir = path.join(distDir, "components");

  if (await fs.pathExists(componentsDir)) {
    const componentDirs = await fs.readdir(componentsDir);

    for (const componentDir of componentDirs) {
      const componentPath = path.join(componentsDir, componentDir, "index.js");
      const componentSize = await measureFile(componentPath);

      if (componentSize) {
        sizes.components[componentDir] = componentSize;
        sizes.total.min += parseFloat(componentSize.min);
        sizes.total.gzip += parseFloat(componentSize.gzip);
      }
    }
  }

  // Measure CSS files
  const cssPath = path.join(distDir, "index.css");
  const cssSize = await measureFile(cssPath);

  if (cssSize) {
    sizes.css.main = cssSize;
    sizes.total.min += parseFloat(cssSize.min);
    sizes.total.gzip += parseFloat(cssSize.gzip);
  }

  // Round totals
  sizes.total.min = sizes.total.min.toFixed(2);
  sizes.total.gzip = sizes.total.gzip.toFixed(2);

  // Save sizes to JSON file
  const sizesPath = path.join(rootDir, "bundle-sizes.json");

  await fs.writeJson(sizesPath, sizes, {spaces: 2});

  // Print size report
  console.log("\n📦 Bundle Size Report");
  console.log("═".repeat(50));
  console.log(`Total: ${sizes.total.min}kb (${sizes.total.gzip}kb gzipped)`);
  console.log("─".repeat(50));

  console.log("\n📄 Main Bundles:");
  console.log(`  index.js: ${sizes.main.min}kb (${sizes.main.gzip}kb gzipped)`);
  if (sizes.plugin.min) {
    console.log(`  plugin.js: ${sizes.plugin.min}kb (${sizes.plugin.gzip}kb gzipped)`);
  }

  if (sizes.css.main) {
    console.log("\n🎨 CSS:");
    console.log(`  index.css: ${sizes.css.main.min}kb (${sizes.css.main.gzip}kb gzipped)`);
  }

  console.log("\n🧩 Components:");
  const sortedComponents = Object.entries(sizes.components).sort(
    (a, b) => parseFloat(b[1].gzip) - parseFloat(a[1].gzip),
  );

  for (const [component, size] of sortedComponents) {
    console.log(`  ${component}: ${size.min}kb (${size.gzip}kb gzipped)`);
  }

  console.log("═".repeat(50));
  console.log(`\n💾 Size report saved to: ${sizesPath}`);

  return sizes;
}

async function main() {
  try {
    // Check if --tsc flag is passed
    const shouldGenerateTypes = process.argv.includes("--tsc");

    await clean();
    // await generateThemes(); // Generate themes before build
    await build();
    await addUseClientDirective();

    if (shouldGenerateTypes) {
      await generateTypes();
      console.log("✅ TypeScript declarations generated");
    } else {
      console.log("⚡ Skipping TypeScript generation (use --tsc to include)");
    }

    await logComponentCount();
    await measureBundleSizes();

    console.log("✨ Build completed successfully!");
  } catch (error) {
    console.error("❌ Build failed:", error);
    process.exit(1);
  }
}

main();
