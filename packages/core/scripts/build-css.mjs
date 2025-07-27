/* eslint-disable no-console */
import {promises as fs} from "fs";
import path from "path";

import chokidar from "chokidar";
import {glob} from "glob";
import postcss from "postcss";
import postcssImport from "postcss-import";
import postcssJs from "postcss-js";
import postcssNested from "postcss-nested";
import {compile} from "tailwindcss";

// Categories to process
const CATEGORIES = ["components", "themes", "utilities", "base"];

// Source and dist directories
const SRC_DIR = "src";
const DIST_DIR = "dist";

// Camel to kebab case converter
const camelToKebab = (str) => {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
};

// Transform object keys from camelCase to kebab-case
const transformKeys = (obj) => {
  if (typeof obj !== "object" || obj === null) return obj;

  if (Array.isArray(obj)) {
    return obj.map(transformKeys);
  }

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      camelToKebab(key),
      typeof value === "object" ? transformKeys(value) : value,
    ]),
  );
};

// Replace @apply true with empty object (DaisyUI approach)
const replaceApplyTrueWithEmptyObject = (obj) => {
  const stack = [obj];

  while (stack.length > 0) {
    const currentObj = stack.pop();

    for (const [key, value] of Object.entries(currentObj)) {
      if (typeof value === "object" && value !== null) {
        stack.push(value);
      }

      if (key.startsWith("@apply") && value === true) {
        currentObj[key] = {};
      }
    }
  }
};

// Merge duplicate media queries that postcss-js creates as arrays
const mergeDuplicateMediaQueries = (obj) => {
  if (typeof obj !== "object" || obj === null) return obj;

  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    // Check if this is a media query with array values
    if (key.startsWith("@media") && Array.isArray(value)) {
      // Merge all objects in the array into a single object
      const merged = value.reduce((acc, current) => {
        if (typeof current === "object" && !Array.isArray(current)) {
          return {...acc, ...current};
        }

        return acc;
      }, {});

      // Recursively process the merged object
      result[key] = mergeDuplicateMediaQueries(merged);
    } else if (Array.isArray(value)) {
      // For arrays that aren't media queries (like duplicate property values),
      // take the last value (CSS cascade rule)
      result[key] = value[value.length - 1];
    } else if (typeof value === "object") {
      // Check if this is an object with numeric keys (postcss-js duplicate property handling)
      const keys = Object.keys(value);
      const hasOnlyNumericKeys = keys.length > 0 && keys.every((k) => /^\d+$/.test(k));

      if (hasOnlyNumericKeys) {
        // Convert numeric-keyed object back to the last value
        // In CSS, when there are duplicate properties, the last one wins
        const lastKey = Math.max(...keys.map(Number)).toString();

        result[key] = value[lastKey];
      } else {
        // Recursively process nested objects
        result[key] = mergeDuplicateMediaQueries(value);
      }
    } else {
      // Keep primitive values as-is
      result[key] = value;
    }
  }

  return result;
};

// Restructure media queries to be nested inside their component selectors
const restructureMediaQueries = (obj) => {
  if (typeof obj !== "object" || obj === null) return obj;

  const result = {};
  const mediaQueries = {};
  
  // First pass: separate media queries from regular selectors
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith("@media")) {
      mediaQueries[key] = value;
    } else {
      result[key] = value;
    }
  }
  
  // Second pass: nest media query rules inside their respective selectors
  for (const [mediaQuery, rules] of Object.entries(mediaQueries)) {
    if (typeof rules === "object") {
      for (const [selector, styles] of Object.entries(rules)) {
        // Find the base selector (without pseudo-classes)
        const baseSelector = selector.replace(/:hover|:active|:focus|:disabled|\[.*?\]/g, '');
        
        // If we have this base selector in our result
        if (result[baseSelector]) {
          // Initialize media query object if it doesn't exist
          if (!result[baseSelector][mediaQuery]) {
            result[baseSelector][mediaQuery] = {};
          }
          
          // Create the nested selector (e.g., ".button--primary:hover" becomes "&:hover")
          const nestedSelector = selector.replace(baseSelector, '&');
          
          // Add the styles under the nested selector
          result[baseSelector][mediaQuery][nestedSelector] = styles;
        } else {
          // If the base selector doesn't exist, keep it at root level
          if (!result[mediaQuery]) {
            result[mediaQuery] = {};
          }
          result[mediaQuery][selector] = styles;
        }
      }
    }
  }
  
  return result;
};

// Load theme files
async function loadThemes() {
  try {
    const defaultTheme = await fs.readFile(
      path.join(process.cwd(), "node_modules/tailwindcss/theme.css"),
      "utf-8",
    );

    // For now, we don't have a variables.css, so we'll use an empty string
    const theme = "";

    return {defaultTheme, theme};
  } catch (error) {
    console.warn("⚠️  Could not load Tailwind theme.css, using fallback");

    return {defaultTheme: "", theme: ""};
  }
}

// Compile and extract styles using Tailwind's compile function
async function compileAndExtractStyles(styleContent, defaultTheme, theme) {
  try {
    const compiledContent = (
      await compile(`
      @layer theme{${defaultTheme}${theme}}
      @layer wrapperStart{${styleContent}}
      @layer wrapperEnd
    `)
    ).build([]);

    const startIndex = compiledContent.indexOf("@layer wrapperStart");
    const endIndex = compiledContent.indexOf("@layer wrapperEnd");

    if (startIndex === -1 || endIndex === -1) {
      throw new Error("Failed to find wrapper layers in compiled content");
    }

    const openingBraceIndex = compiledContent.indexOf("{", startIndex);
    const closingBraceIndex = compiledContent.lastIndexOf("}", endIndex);

    if (
      openingBraceIndex === -1 ||
      closingBraceIndex === -1 ||
      openingBraceIndex >= closingBraceIndex
    ) {
      throw new Error("Invalid wrapper structure in compiled content");
    }

    return compiledContent.substring(openingBraceIndex + 1, closingBraceIndex).trim();
  } catch (error) {
    console.warn(`⚠️  Could not compile with Tailwind, using original content: ${error.message}`);

    return styleContent;
  }
}

// Clean CSS - similar to DaisyUI's approach
function cleanCss(cssContent) {
  // Precompile regular expressions for better performance
  const emptyFallbackRegex = /var\((--[^,)]+),\s*\)/g;
  const spacingWidthFallbackRegex =
    /var\((--(spacing|width)[\w-]*),\s*((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*)\)/g;
  const spacingVarRegex = /var\(--spacing\)/g;

  // Remove empty fallbacks
  cssContent = cssContent.replace(emptyFallbackRegex, "var($1)");

  // Remove spacing, width css variable if there's a fallback value
  cssContent = cssContent.replace(
    spacingWidthFallbackRegex,
    (match, variable, prefix, fallback) => {
      // If there's no actual fallback value, return the original match
      return fallback.trim() ? fallback.trim() : match;
    },
  );

  // Replace all `var(--spacing)` with `0.25rem`
  cssContent = cssContent.replace(spacingVarRegex, "0.25rem");

  // Also remove empty rules
  const root = postcss.parse(cssContent);

  root.walkRules((rule) => {
    if (rule.nodes && rule.nodes.length === 0) {
      rule.remove();
    }
  });

  return root.toString();
}

// Process a single CSS file
async function processCSSFile(filePath, category, defaultTheme, theme, outputSubPath = "") {
  try {
    // Read CSS file
    const cssContent = await fs.readFile(filePath, "utf-8");

    // Compile and extract styles (expands @apply directives)
    const rawCss = await compileAndExtractStyles(cssContent, defaultTheme, theme);

    // Clean the CSS
    const cleanedCss = cleanCss(rawCss);

    // Process with PostCSS
    const result = await postcss([postcssImport(), postcssNested()]).process(cleanedCss, {
      from: filePath,
    });

    // Convert to JS object
    const root = postcss.parse(result.css);
    const jsObject = postcssJs.objectify(root);

    // Transform keys to kebab-case
    const kebabCaseObject = transformKeys(jsObject);

    // Apply DaisyUI transformations
    replaceApplyTrueWithEmptyObject(kebabCaseObject);

    // Merge duplicate media queries
    const mergedObject = mergeDuplicateMediaQueries(kebabCaseObject);
    
    // Restructure media queries to be nested inside components
    const finalObject = restructureMediaQueries(mergedObject);

    // Generate JS content
    const jsContent = `export default ${JSON.stringify(finalObject, null, 2)};`;

    // Determine output path
    const fileName = path.basename(filePath, ".css");
    const outputDir = path.join(DIST_DIR, category, outputSubPath);
    const outputPath = path.join(outputDir, `${fileName}.js`);

    // Ensure output directory exists
    await fs.mkdir(outputDir, {recursive: true});

    // Write JS file
    await fs.writeFile(outputPath, jsContent);

    const displayPath = outputSubPath ? `${outputSubPath}/${fileName}` : fileName;

    console.log(`✅ Processed: ${displayPath}.css → ${displayPath}.js`);

    return {fileName, subPath: outputSubPath};
  } catch (error) {
    console.error(`❌ Error processing ${filePath}: ${error.message}`);
    throw error;
  }
}

// Generate index file for themes
async function generateThemeIndexFile(themeData) {
  try {
    // Group by theme name
    const themes = {};

    for (const {fileName, subPath} of themeData) {
      if (!themes[subPath]) {
        themes[subPath] = [];
      }
      themes[subPath].push(fileName);
    }

    // Generate imports and exports
    let imports = "";
    let exports = "export const themes = {\n";

    for (const [themeName, files] of Object.entries(themes)) {
      if (themeName) {
        // Import theme variants
        for (const file of files) {
          const importName = `${themeName}_${file}`;

          imports += `import ${importName} from './${themeName}/${file}.js';\n`;
        }

        // Export theme object
        exports += `  "${themeName}": {\n`;
        for (const file of files) {
          exports += `    "${file}": ${themeName}_${file},\n`;
        }
        exports += "  },\n";
      }
    }

    exports += "};\n\nexport default themes;\n";

    const content = imports + "\n" + exports;

    const indexPath = path.join(DIST_DIR, "themes", "index.js");

    await fs.writeFile(indexPath, content);

    console.log(`✅ Generated index.js for themes`);
  } catch (error) {
    console.error(`❌ Error generating theme index: ${error.message}`);
    throw error;
  }
}

// Generate index file for a category
async function generateIndexFile(category, processedFiles) {
  try {
    const imports = processedFiles.map((file) => `import ${file} from './${file}.js';`).join("\n");

    const exports = `
export {
  ${processedFiles.join(",\n  ")}
};`;

    const content = imports + "\n" + exports + "\n";

    const indexPath = path.join(DIST_DIR, category, "index.js");

    await fs.writeFile(indexPath, content);

    console.log(`✅ Generated index.js for ${category}`);
  } catch (error) {
    console.error(`❌ Error generating index for ${category}: ${error.message}`);
    throw error;
  }
}

// Process themes with nested structure
async function processThemes(defaultTheme, theme) {
  try {
    const themesPath = path.join(SRC_DIR, "themes");

    // Check if themes directory exists
    try {
      await fs.access(themesPath);
    } catch {
      console.log(`⏭️  Skipping themes (not found)`);

      return [];
    }

    // Find all theme folders
    const themeDirs = await fs.readdir(themesPath, {withFileTypes: true});
    const themeData = [];

    for (const dir of themeDirs) {
      if (dir.isDirectory()) {
        const themeName = dir.name;
        const themeDir = path.join(themesPath, themeName);

        // Find all CSS files in the theme directory
        const pattern = path.join(themeDir, "*.css");
        const files = await glob(pattern);

        // Process each file
        for (const file of files) {
          const result = await processCSSFile(file, "themes", defaultTheme, theme, themeName);

          themeData.push(result);
        }
      }
    }

    // Generate theme index file
    if (themeData.length > 0) {
      await generateThemeIndexFile(themeData);
    }

    return themeData;
  } catch (error) {
    console.error(`❌ Error processing themes: ${error.message}`);
    throw error;
  }
}

// Process all CSS files in a category
async function processCategory(category, defaultTheme, theme) {
  try {
    // Special handling for themes
    if (category === "themes") {
      return await processThemes(defaultTheme, theme);
    }

    const srcPath = path.join(SRC_DIR, category);

    // Check if category exists
    try {
      await fs.access(srcPath);
    } catch {
      console.log(`⏭️  Skipping ${category} (not found)`);

      return [];
    }

    // Find all CSS files in the category
    const pattern = path.join(srcPath, "*.css");
    const files = await glob(pattern);

    if (files.length === 0) {
      console.log(`⏭️  No CSS files found in ${category}`);

      return [];
    }

    // Process all files
    const processedFiles = [];

    for (const file of files) {
      const {fileName} = await processCSSFile(file, category, defaultTheme, theme);

      processedFiles.push(fileName);
    }

    // Generate index file
    if (processedFiles.length > 0) {
      await generateIndexFile(category, processedFiles);
    }

    return processedFiles;
  } catch (error) {
    console.error(`❌ Error processing category ${category}: ${error.message}`);
    throw error;
  }
}

// Main build function
async function build() {
  console.log("🔧 Building CSS files...\n");

  try {
    // Load themes
    const {defaultTheme, theme} = await loadThemes();

    // Ensure dist directory exists
    await fs.mkdir(DIST_DIR, {recursive: true});

    // Process all categories
    for (const category of CATEGORIES) {
      await processCategory(category, defaultTheme, theme);
    }

    console.log("\n✨ CSS build completed!");
  } catch (error) {
    console.error("\n❌ Build failed:", error.message);
    process.exit(1);
  }
}

// Watch mode
async function watch() {
  console.log("👀 Watching for CSS changes...\n");

  // Initial build
  await build();

  // Watch for changes
  const watchPatterns = [
    ...CATEGORIES.filter((cat) => cat !== "themes").map((cat) => path.join(SRC_DIR, cat, "*.css")),
    path.join(SRC_DIR, "themes", "*", "*.css"), // Watch nested theme files
  ];

  const watcher = chokidar.watch(watchPatterns, {
    ignoreInitial: true,
    persistent: true,
  });

  const {defaultTheme, theme} = await loadThemes();

  watcher
    .on("add", async (filePath) => {
      console.log(`\n📝 Added: ${filePath}`);
      await build(); // Rebuild everything for simplicity
    })
    .on("change", async (filePath) => {
      console.log(`\n✏️  Changed: ${filePath}`);
      await build(); // Rebuild everything for simplicity
    })
    .on("unlink", async (filePath) => {
      console.log(`\n🗑️  Deleted: ${filePath}`);
      await build(); // Rebuild everything for simplicity
    });

  console.log("Press Ctrl+C to stop watching\n");
}

// CLI
const isWatchMode = process.argv.includes("--watch") || process.argv.includes("-w");

if (isWatchMode) {
  watch();
} else {
  build();
}
