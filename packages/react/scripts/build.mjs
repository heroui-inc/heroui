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
  execSync("rollup -c rollup.config.mjs", {cwd: rootDir, stdio: "inherit"});
}

async function buildStyles() {
  console.log("🎨 Creating styles export...");

  // Simply copy the styles.css file to dist
  const stylesPath = path.join(rootDir, "src/styles.css");
  const outputPath = path.join(distDir, "styles.css");

  await fs.copy(stylesPath, outputPath);

  console.log("✅ Styles export created successfully");
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
  console.log("🔧 Adding directives to files...");

  // Find all JS files in the components and hooks directories
  const jsFiles = [];
  const componentsDir = path.join(distDir, "components");
  const hooksDir = path.join(distDir, "hooks");
  const srcDir = path.join(rootDir, "src");

  async function findJsFiles(dir) {
    const items = await fs.readdir(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = await fs.stat(fullPath);

      if (stat.isDirectory()) {
        await findJsFiles(fullPath);
      } else if (item.endsWith(".js")) {
        jsFiles.push(fullPath);
      }
    }
  }

  if (await fs.pathExists(componentsDir)) {
    await findJsFiles(componentsDir);
  }

  if (await fs.pathExists(hooksDir)) {
    await findJsFiles(hooksDir);
  }

  let useClientCount = 0;
  let useStrictCount = 0;

  // Add "use client" or "use strict" based on source file type
  for (const jsFile of jsFiles) {
    // Map the dist file back to its source file
    const relativePath = path.relative(distDir, jsFile);
    const sourcePathTs = path.join(srcDir, relativePath.replace(/\.js$/, ".ts"));
    const sourcePathTsx = path.join(srcDir, relativePath.replace(/\.js$/, ".tsx"));

    const content = await fs.readFile(jsFile, "utf-8");

    // Skip if already has a directive
    if (
      content.startsWith('"use client"') ||
      content.startsWith("'use client'") ||
      content.startsWith('"use strict"') ||
      content.startsWith("'use strict'")
    ) {
      continue;
    }

    // Check which source file exists
    const isTsx = await fs.pathExists(sourcePathTsx);
    const isTs = await fs.pathExists(sourcePathTs);

    if (isTsx) {
      // .tsx files get "use client"
      await fs.writeFile(jsFile, `"use client";\n${content}`);
      useClientCount++;
    } else if (isTs) {
      // .ts files get "use strict"
      await fs.writeFile(jsFile, `"use strict";\n${content}`);
      useStrictCount++;
    }
  }

  console.log(`✅ Added "use client" to ${useClientCount} files (from .tsx)`);
  console.log(`✅ Added "use strict" to ${useStrictCount} files (from .ts)`);
}

async function measureBundleSizes() {
  console.log("📊 Measuring bundle sizes...");

  const sizes = {
    components: {},
    css: {},
    hooks: null,
    main: {},
    note: "Per-component figures are the sum of every .js file under that component directory (preserveModules). They do not include shared utils/hooks or a reachable-graph bundling of transitive imports. `total` is the gzip of every unique .js under dist/.",
    plugin: {},
    total: {gzip: "0.00", min: "0.00"},
    utils: null,
  };

  function measureBytes(content) {
    return {
      gzip: zlib.gzipSync(content, {level: 9}).length / 1000,
      min: Buffer.byteLength(content) / 1000,
    };
  }

  function fileCount(count) {
    return `${count} file${count === 1 ? "" : "s"}`;
  }

  async function measureFile(filePath) {
    if (!(await fs.pathExists(filePath))) {
      return null;
    }

    const measured = measureBytes(await fs.readFile(filePath));

    return {
      gzip: measured.gzip.toFixed(2),
      min: measured.min.toFixed(2),
    };
  }

  async function collectJsFiles(dir) {
    if (!(await fs.pathExists(dir))) {
      return [];
    }

    const entries = await fs.readdir(dir, {withFileTypes: true});
    const files = [];

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        files.push(...(await collectJsFiles(fullPath)));
      } else if (entry.isFile() && entry.name.endsWith(".js")) {
        files.push(fullPath);
      }
    }

    return files;
  }

  async function measureDirectory(dir) {
    const files = await collectJsFiles(dir);

    if (files.length === 0) {
      return null;
    }

    // Concatenate then gzip once so the figure reflects shared dictionary across
    // the directory's modules, rather than summing independently-gzipped files.
    const concatenated = Buffer.concat(await Promise.all(files.map((f) => fs.readFile(f))));
    const measured = measureBytes(concatenated);

    return {
      files: files.length,
      gzip: measured.gzip.toFixed(2),
      min: measured.min.toFixed(2),
    };
  }

  const mainSize = await measureFile(path.join(distDir, "index.js"));

  if (mainSize) {
    sizes.main = mainSize;
  }

  const pluginSize = await measureFile(path.join(distDir, "plugin.js"));

  if (pluginSize) {
    sizes.plugin = pluginSize;
  }

  const componentsDir = path.join(distDir, "components");

  if (await fs.pathExists(componentsDir)) {
    const componentDirs = await fs.readdir(componentsDir);

    for (const componentDir of componentDirs) {
      const componentPath = path.join(componentsDir, componentDir);
      const stat = await fs.stat(componentPath);

      if (!stat.isDirectory()) continue;

      const componentSize = await measureDirectory(componentPath);

      if (componentSize) {
        sizes.components[componentDir] = componentSize;
      }
    }
  }

  sizes.utils = await measureDirectory(path.join(distDir, "utils"));
  sizes.hooks = await measureDirectory(path.join(distDir, "hooks"));

  const cssPath = path.join(distDir, "styles.css");
  const cssSize = await measureFile(cssPath);

  if (cssSize) {
    sizes.css.styles = cssSize;
  }

  // Unique-file total across the whole dist tree — the only non-overlapping figure.
  const allJs = await collectJsFiles(distDir);
  const allContent = Buffer.concat(await Promise.all(allJs.map((f) => fs.readFile(f))));
  const totalMeasured = measureBytes(allContent);

  sizes.total = {
    files: allJs.length,
    gzip: totalMeasured.gzip.toFixed(2),
    min: totalMeasured.min.toFixed(2),
  };

  const sizesPath = path.join(rootDir, "bundle-sizes.json");

  await fs.writeJson(sizesPath, sizes, {spaces: 2});

  console.log("\n📦 Bundle Size Report");
  console.log("═".repeat(50));
  console.log(
    `Total across ${fileCount(sizes.total.files)}: ${sizes.total.min}kb (${sizes.total.gzip}kb gzipped)`,
  );
  console.log("─".repeat(50));
  console.log("\n📄 Entry:");
  console.log(`  index.js: ${sizes.main.min}kb (${sizes.main.gzip}kb gzipped)`);
  if (sizes.plugin.min) {
    console.log(`  plugin.js: ${sizes.plugin.min}kb (${sizes.plugin.gzip}kb gzipped)`);
  }
  if (sizes.utils) {
    console.log(
      `  utils/ (${fileCount(sizes.utils.files)}): ${sizes.utils.min}kb (${sizes.utils.gzip}kb gzipped)`,
    );
  }
  if (sizes.hooks) {
    console.log(
      `  hooks/ (${fileCount(sizes.hooks.files)}): ${sizes.hooks.min}kb (${sizes.hooks.gzip}kb gzipped)`,
    );
  }
  if (sizes.css.styles) {
    console.log("\n🎨 CSS:");
    console.log(`  styles.css: ${sizes.css.styles.min}kb (${sizes.css.styles.gzip}kb gzipped)`);
  }
  console.log("\n🧩 Components (own modules only — excludes shared utils/hooks):");
  const sortedComponents = Object.entries(sizes.components).sort(
    (a, b) => parseFloat(b[1].gzip) - parseFloat(a[1].gzip),
  );

  for (const [component, size] of sortedComponents) {
    console.log(
      `  ${component} (${fileCount(size.files)}): ${size.min}kb (${size.gzip}kb gzipped)`,
    );
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
    await buildStyles();
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
