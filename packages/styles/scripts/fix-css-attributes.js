#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * Script to fix CSS attribute selectors missing ="true" suffix
 *
 * Usage:
 *   node fix-css-attributes.js --dry-run  # Preview changes
 *   node fix-css-attributes.js            # Apply changes
 */

import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Target directory
const COMPONENTS_DIR = path.join(__dirname, "..", "components");

// Patterns to replace: [attribute] -> [attribute="true"]
const REPLACEMENT_PATTERNS = [
  // ARIA attributes
  {pattern: /\[aria-disabled\](?!=")/g, replacement: '[aria-disabled="true"]'},
  {pattern: /\[aria-invalid\](?!=")/g, replacement: '[aria-invalid="true"]'},
  {pattern: /\[aria-checked\](?!=")/g, replacement: '[aria-checked="true"]'},
  {pattern: /\[aria-selected\](?!=")/g, replacement: '[aria-selected="true"]'},
  {pattern: /\[aria-expanded\](?!=")/g, replacement: '[aria-expanded="true"]'},
  {pattern: /\[aria-multiselectable\](?!=")/g, replacement: '[aria-multiselectable="true"]'},

  // Data attributes
  {pattern: /\[data-hovered\](?!=")/g, replacement: '[data-hovered="true"]'},
  {pattern: /\[data-focus-visible\](?!=")/g, replacement: '[data-focus-visible="true"]'},
  {pattern: /\[data-pressed\](?!=")/g, replacement: '[data-pressed="true"]'},
  {pattern: /\[data-pending\](?!=")/g, replacement: '[data-pending="true"]'},
  {pattern: /\[data-entering\](?!=")/g, replacement: '[data-entering="true"]'},
  {pattern: /\[data-exiting\](?!=")/g, replacement: '[data-exiting="true"]'},
  {pattern: /\[data-open\](?!=")/g, replacement: '[data-open="true"]'},
  {pattern: /\[data-invalid\](?!=")/g, replacement: '[data-invalid="true"]'},
];

/**
 * Check if a file should be processed
 */
function shouldProcessFile(filePath) {
  return filePath.endsWith(".css");
}

/**
 * Process a single CSS file
 */
function processFile(filePath, dryRun = false) {
  const content = fs.readFileSync(filePath, "utf8");
  let modifiedContent = content;
  const changes = [];
  const lines = content.split("\n");

  // Collect all matches from all patterns first
  const allMatches = [];

  for (const {pattern, replacement} of REPLACEMENT_PATTERNS) {
    const regex = new RegExp(pattern.source, pattern.flags);
    let match;

    regex.lastIndex = 0;
    while ((match = regex.exec(content)) !== null) {
      allMatches.push({
        index: match.index,
        length: match[0].length,
        replacement,
        text: match[0],
      });
    }
  }

  if (allMatches.length === 0) {
    return {changed: false};
  }

  // Sort matches by index in descending order for safe replacement
  allMatches.sort((a, b) => b.index - a.index);

  // Track which lines have changes
  const lineChanges = new Map();

  // Process matches in reverse order to preserve indices
  for (const {index, length, replacement, text} of allMatches) {
    // Find which line this match is on
    const beforeMatch = content.substring(0, index);
    const lineNumber = beforeMatch.split("\n").length;
    const line = lines[lineNumber - 1];

    // Calculate position in line
    const lastNewlineIndex = beforeMatch.lastIndexOf("\n");
    const positionInLine = index - (lastNewlineIndex === -1 ? 0 : lastNewlineIndex + 1);

    // Track the change for this line
    if (!lineChanges.has(lineNumber)) {
      lineChanges.set(lineNumber, {
        line: lineNumber,
        original: line,
        replacements: [],
      });
    }

    const lineChange = lineChanges.get(lineNumber);

    lineChange.replacements.push({
      length,
      position: positionInLine,
      replacement,
      text,
    });

    // Perform replacement in content (in reverse order, so indices stay valid)
    modifiedContent =
      modifiedContent.substring(0, index) + replacement + modifiedContent.substring(index + length);
  }

  // Build final change list with properly replaced lines
  for (const [lineNumber, lineChange] of lineChanges.entries()) {
    // Sort replacements by position in reverse order
    lineChange.replacements.sort((a, b) => b.position - a.position);

    let modifiedLine = lineChange.original;

    for (const {length, position, replacement} of lineChange.replacements) {
      modifiedLine =
        modifiedLine.substring(0, position) +
        replacement +
        modifiedLine.substring(position + length);
    }

    changes.push({
      line: lineNumber,
      original: lineChange.original.trim(),
      replacement: modifiedLine.trim(),
    });
  }

  // Sort changes by line number for display
  changes.sort((a, b) => a.line - b.line);

  // Only write if content changed
  if (modifiedContent !== content) {
    if (!dryRun) {
      fs.writeFileSync(filePath, modifiedContent, "utf8");
    }

    return {
      changed: true,
      changes,
      modifiedContent,
      originalContent: content,
    };
  }

  return {changed: false};
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");

  console.log(
    `\n${dryRun ? "🔍 DRY RUN MODE - No files will be modified" : "✏️  APPLYING CHANGES"}\n`,
  );
  console.log(`Scanning directory: ${COMPONENTS_DIR}\n`);

  // Get all CSS files
  const files = fs
    .readdirSync(COMPONENTS_DIR)
    .filter((file) => shouldProcessFile(file))
    .map((file) => path.join(COMPONENTS_DIR, file))
    .sort();

  console.log(`Found ${files.length} CSS file(s)\n`);

  let totalFilesChanged = 0;
  let totalReplacements = 0;

  // Process each file
  for (const filePath of files) {
    const fileName = path.basename(filePath);
    const result = processFile(filePath, dryRun);

    if (result.changed) {
      totalFilesChanged++;
      const replacementCount = result.changes.length;

      totalReplacements += replacementCount;

      console.log(`📝 ${fileName}`);
      console.log(`   ${replacementCount} replacement(s)`);

      // Show first few changes
      if (result.changes.length > 0) {
        const previewCount = Math.min(3, result.changes.length);

        result.changes.slice(0, previewCount).forEach(({line, original, replacement}) => {
          console.log(`   Line ${line}:`);
          console.log(`     - ${original}`);
          console.log(`     + ${replacement}`);
        });
        if (result.changes.length > previewCount) {
          console.log(`   ... and ${result.changes.length - previewCount} more`);
        }
      }
      console.log("");
    }
  }

  // Summary
  console.log("─".repeat(60));
  console.log(`\nSummary:`);
  console.log(`  Files processed: ${files.length}`);
  console.log(`  Files changed: ${totalFilesChanged}`);
  console.log(`  Total replacements: ${totalReplacements}`);

  if (dryRun) {
    console.log(`\n💡 Run without --dry-run to apply these changes\n`);
  } else {
    console.log(`\n✅ Changes applied successfully!\n`);
  }
}

// Run the script
main();
