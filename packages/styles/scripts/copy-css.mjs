#!/usr/bin/env node
/* eslint-disable no-console */
import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const distDir = path.join(rootDir, "dist");

// Create dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, {recursive: true});
}

console.log("Copying CSS files to dist...");

// Helper function to recursively copy CSS files
const copyCssDirectory = (dirName) => {
  const srcDirPath = path.join(rootDir, dirName);
  const distDirPath = path.join(distDir, dirName);

  if (!fs.existsSync(srcDirPath)) {
    return;
  }

  // Create directory in dist
  if (!fs.existsSync(distDirPath)) {
    fs.mkdirSync(distDirPath, {recursive: true});
  }

  // Read all files in the directory
  const files = fs.readdirSync(srcDirPath);

  for (const file of files) {
    const srcFilePath = path.join(srcDirPath, file);
    const distFilePath = path.join(distDirPath, file);
    const stat = fs.statSync(srcFilePath);

    if (stat.isDirectory()) {
      // Recursively copy subdirectories
      copyCssDirectory(path.join(dirName, file));
    } else if (file.endsWith(".css")) {
      // Copy CSS files
      fs.copyFileSync(srcFilePath, distFilePath);
      console.log(`✓ Copied: ${path.join(dirName, file)}`);
    }
  }
};

// Copy root index.css
const indexPath = path.join(rootDir, "index.css");

if (fs.existsSync(indexPath)) {
  fs.copyFileSync(indexPath, path.join(distDir, "index.css"));
  console.log("✓ Copied: index.css");
}

// Copy all CSS files from these directories
const directories = ["base", "components", "themes", "utilities"];

for (const dir of directories) {
  copyCssDirectory(dir);
}

console.log("✅ CSS files copied successfully!");
