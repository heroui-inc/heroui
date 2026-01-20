#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * This script flattens the chained `export *` statements in dist/index.js
 * to explicit named exports. This is necessary because some bundlers (like esbuild)
 * cannot statically analyze chained `export *` statements.
 *
 * Instead of:
 *   export * from "./components";
 *
 * We generate:
 *   export { accordionVariants } from "./components/accordion/accordion.styles.js";
 *   export { tooltipVariants } from "./components/tooltip/tooltip.styles.js";
 *   // ... etc
 */
import fs from "fs/promises";
import path from "path";
import {fileURLToPath} from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

/**
 * Check if a path exists
 */
async function pathExists(filePath) {
  try {
    await fs.access(filePath);

    return true;
  } catch {
    return false;
  }
}

/**
 * Extract named exports from a JavaScript file
 * Looks for patterns like: export { name } or export const name
 */
function extractExports(content, includeTypes = false) {
  const exports = [];

  // Match: export { name1, name2 } or export { name1 as alias1 }
  const reExportMatch = content.matchAll(/export\s*\{([^}]+)\}/g);

  for (const match of reExportMatch) {
    const names = match[1].split(",").map((n) => {
      // Handle "name as alias" - we want the exported name (alias or original)
      const parts = n.trim().split(/\s+as\s+/);

      return parts[parts.length - 1].trim();
    });

    exports.push(...names.filter((n) => n && !n.includes("*")));
  }

  // Match: export const name = or export function name or export class name
  const directExportMatch = content.matchAll(
    /export\s+(?:const|let|var|function|class)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g,
  );

  for (const match of directExportMatch) {
    exports.push(match[1]);
  }

  // Match: export declare const name (for .d.ts files)
  const declareExportMatch = content.matchAll(
    /export\s+declare\s+(?:const|let|var|function|class)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g,
  );

  for (const match of declareExportMatch) {
    exports.push(match[1]);
  }

  // Match: export type Name = (for .d.ts files, only if includeTypes is true)
  if (includeTypes) {
    const typeExportMatch = content.matchAll(/export\s+type\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=/g);

    for (const match of typeExportMatch) {
      exports.push({isType: true, name: match[1]});
    }
  }

  return [...new Set(exports.map((e) => (typeof e === "string" ? e : JSON.stringify(e))))].map(
    (e) => {
      try {
        return JSON.parse(e);
      } catch {
        return e;
      }
    },
  );
}

/**
 * Recursively find all .js files in a directory
 */
async function findJsFiles(dir, basePath = "") {
  const files = [];

  if (!(await pathExists(dir))) {
    return files;
  }

  const items = await fs.readdir(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const relativePath = path.join(basePath, item);
    const stat = await fs.stat(fullPath);

    if (stat.isDirectory()) {
      files.push(...(await findJsFiles(fullPath, relativePath)));
    } else if (item.endsWith(".js") && !item.endsWith(".d.js")) {
      files.push({fullPath, relativePath});
    }
  }

  return files;
}

/**
 * Recursively find all .d.ts files in a directory
 */
async function findDtsFiles(dir, basePath = "") {
  const files = [];

  if (!(await pathExists(dir))) {
    return files;
  }

  const items = await fs.readdir(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const relativePath = path.join(basePath, item);
    const stat = await fs.stat(fullPath);

    if (stat.isDirectory()) {
      files.push(...(await findDtsFiles(fullPath, relativePath)));
    } else if (item.endsWith(".d.ts") && !item.endsWith(".d.ts.map")) {
      files.push({fullPath, relativePath});
    }
  }

  return files;
}

/**
 * Generate flattened export statements for a module directory
 */
async function generateFlattenedExports(moduleDir, modulePrefix) {
  const exports = [];
  const jsFiles = await findJsFiles(moduleDir);

  for (const {fullPath, relativePath} of jsFiles) {
    const content = await fs.readFile(fullPath, "utf-8");
    const fileExports = extractExports(content);

    if (fileExports.length > 0) {
      // Convert Windows paths to forward slashes and create relative import path
      const importPath = `./${modulePrefix}/${relativePath.replace(/\\/g, "/").replace(/\.js$/, ".js")}`;

      for (const exportName of fileExports) {
        const name = typeof exportName === "string" ? exportName : exportName.name;

        exports.push({from: importPath, isType: false, name});
      }
    }
  }

  return exports;
}

/**
 * Generate flattened export statements for types from .d.ts files
 */
async function generateFlattenedTypeExports(moduleDir, modulePrefix) {
  const exports = [];
  const dtsFiles = await findDtsFiles(moduleDir);

  for (const {fullPath, relativePath} of dtsFiles) {
    const content = await fs.readFile(fullPath, "utf-8");
    const fileExports = extractExports(content, true);

    // Convert Windows paths to forward slashes and create relative import path (without .d.ts)
    const importPath = `./${modulePrefix}/${relativePath.replace(/\\/g, "/").replace(/\.d\.ts$/, "")}`;

    for (const exportItem of fileExports) {
      if (typeof exportItem === "object" && exportItem.isType) {
        exports.push({from: importPath, isType: true, name: exportItem.name});
      }
    }
  }

  return exports;
}

async function flattenExports() {
  console.log("🔧 Flattening exports in dist/index.js...");

  const indexPath = path.join(distDir, "index.js");

  if (!(await pathExists(indexPath))) {
    console.error("❌ dist/index.js not found. Run tsc first.");
    process.exit(1);
  }

  // Read the original index.js
  let content = await fs.readFile(indexPath, "utf-8");

  // Collect all flattened exports
  const allExports = [];

  // Process components directory
  const componentsDir = path.join(distDir, "components");

  if (await pathExists(componentsDir)) {
    const componentExports = await generateFlattenedExports(componentsDir, "components");

    allExports.push(...componentExports);
  }

  // Process utils directory
  const utilsDir = path.join(distDir, "utils");

  if (await pathExists(utilsDir)) {
    const utilsExports = await generateFlattenedExports(utilsDir, "utils");

    allExports.push(...utilsExports);
  }

  // Generate the flattened export statements
  const flattenedExportStatements = allExports
    .map(({from, name}) => `export { ${name} } from "${from}";`)
    .join("\n");

  // Replace the chained export * statements with flattened exports
  // Remove: export * from "./components";
  content = content.replace(/export\s*\*\s*from\s*["']\.\/components["'];?\n?/g, "");
  // Remove: export * from "./utils";
  content = content.replace(/export\s*\*\s*from\s*["']\.\/utils["'];?\n?/g, "");

  // Remove any existing flattened exports section (to handle rebuilds without clean)
  content = content.replace(/\n*\/\/ Flattened component exports \(auto-generated\)[\s\S]*$/g, "");

  // Append the flattened exports
  content =
    content.trim() +
    "\n\n// Flattened component exports (auto-generated)\n" +
    flattenedExportStatements +
    "\n";

  // Write the updated index.js
  await fs.writeFile(indexPath, content);

  console.log(`✅ Flattened ${allExports.length} exports in dist/index.js`);

  // Also update the declaration file
  await flattenDeclarations(allExports);
}

/**
 * Flatten the TypeScript declaration file as well
 */
async function flattenDeclarations(allExports) {
  const dtsPath = path.join(distDir, "index.d.ts");

  if (!(await pathExists(dtsPath))) {
    console.log("⚠️  dist/index.d.ts not found, skipping declaration flattening");

    return;
  }

  let content = await fs.readFile(dtsPath, "utf-8");

  // Collect type exports from .d.ts files
  const typeExports = [];
  const componentsDir = path.join(distDir, "components");
  const utilsDir = path.join(distDir, "utils");

  if (await pathExists(componentsDir)) {
    const componentTypeExports = await generateFlattenedTypeExports(componentsDir, "components");

    typeExports.push(...componentTypeExports);
  }

  if (await pathExists(utilsDir)) {
    const utilsTypeExports = await generateFlattenedTypeExports(utilsDir, "utils");

    typeExports.push(...utilsTypeExports);
  }

  // Generate value exports (without .js extension for .d.ts)
  const valueExportStatements = allExports
    .map(({from, name}) => {
      const dtsFrom = from.replace(/\.js$/, "");

      return `export { ${name} } from "${dtsFrom}";`;
    })
    .join("\n");

  // Generate type exports
  const typeExportStatements = typeExports
    .map(({from, name}) => `export type { ${name} } from "${from}";`)
    .join("\n");

  // Remove the chained export * statements
  content = content.replace(/export\s*\*\s*from\s*["']\.\/components["'];?\n?/g, "");
  content = content.replace(/export\s*\*\s*from\s*["']\.\/utils["'];?\n?/g, "");

  // Remove any existing flattened exports section (to handle rebuilds without clean)
  content = content.replace(/\n*\/\/ Flattened component exports \(auto-generated\)[\s\S]*$/g, "");

  // Append the flattened exports
  content =
    content.trim() +
    "\n\n// Flattened component exports (auto-generated)\n" +
    valueExportStatements +
    "\n" +
    typeExportStatements +
    "\n";

  await fs.writeFile(dtsPath, content);

  console.log(
    `✅ Flattened ${allExports.length + typeExports.length} exports in dist/index.d.ts (${typeExports.length} types)`,
  );
}

flattenExports().catch((error) => {
  console.error("❌ Failed to flatten exports:", error);
  process.exit(1);
});
