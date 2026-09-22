import {readFile, readdir, stat, writeFile} from "node:fs/promises";
import path from "node:path";

import ts from "typescript";

const explicitEsmExtension = /\.[^/]+$/;
const explicitJavaScriptExtension = /\.[cm]?jsx?$/i;

async function pathIsFile(filePath) {
  try {
    return (await stat(filePath)).isFile();
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

async function pathIsDirectory(directoryPath) {
  try {
    return (await stat(directoryPath)).isDirectory();
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

async function collectDeclarationFiles(directoryPath) {
  const entries = await readdir(directoryPath, {withFileTypes: true});
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectDeclarationFiles(entryPath)));
    } else if (entry.isFile() && entry.name.endsWith(".d.ts")) {
      files.push(entryPath);
    }
  }

  return files;
}

async function declarationReplacement(filePath, specifier) {
  if (!specifier.startsWith("./") && !specifier.startsWith("../")) return null;
  if (explicitJavaScriptExtension.test(specifier)) return null;

  const targetPath = path.resolve(path.dirname(filePath), specifier);

  if (await pathIsFile(`${targetPath}.d.ts`)) return `${specifier}.js`;
  if (await pathIsFile(`${targetPath}.d.mts`)) return `${specifier}.mjs`;
  if (await pathIsFile(`${targetPath}.d.cts`)) return `${specifier}.cjs`;

  if (await pathIsDirectory(targetPath)) {
    if (await pathIsFile(path.join(targetPath, "index.d.ts"))) {
      return `${specifier.replace(/\/$/, "")}/index.js`;
    }
    if (await pathIsFile(path.join(targetPath, "index.d.mts"))) {
      return `${specifier.replace(/\/$/, "")}/index.mjs`;
    }
    if (await pathIsFile(path.join(targetPath, "index.d.cts"))) {
      return `${specifier.replace(/\/$/, "")}/index.cjs`;
    }
  }

  return null;
}

function declarationSpecifiers(content) {
  return ts.preProcessFile(content, true, true).importedFiles;
}

async function rewriteDeclarationFile(filePath) {
  let content = await readFile(filePath, "utf8");
  const replacements = [];

  for (const importedFile of declarationSpecifiers(content)) {
    const replacement = await declarationReplacement(filePath, importedFile.fileName);

    if (replacement) {
      // TypeScript's preprocessor range includes the opening quote and excludes
      // the final specifier character, so offset both ends by one.
      replacements.push({end: importedFile.end + 1, replacement, start: importedFile.pos + 1});
    }
  }

  for (const {end, replacement, start} of replacements.reverse()) {
    content = `${content.slice(0, start)}${replacement}${content.slice(end)}`;
  }

  if (replacements.length > 0) {
    await writeFile(filePath, content);
  }

  for (const importedFile of declarationSpecifiers(content)) {
    const {fileName: specifier} = importedFile;

    if (!specifier.startsWith("./") && !specifier.startsWith("../")) continue;

    const replacement = await declarationReplacement(filePath, specifier);

    if (replacement || !explicitEsmExtension.test(specifier)) {
      throw new Error(`Declaration import is not Node ESM compatible: ${filePath} -> ${specifier}`);
    }
  }

  return replacements.length;
}

async function rewriteDeclarationImports(directoryPath, {log = () => {}} = {}) {
  const declarationFiles = await collectDeclarationFiles(directoryPath);
  let rewrittenSpecifiers = 0;

  if (declarationFiles.length === 0) {
    throw new Error(`No declaration files found in ${directoryPath}`);
  }

  for (const filePath of declarationFiles) {
    rewrittenSpecifiers += await rewriteDeclarationFile(filePath);
  }

  log(
    `✅ Rewrote ${rewrittenSpecifiers} relative declaration specifiers across ${declarationFiles.length} files`,
  );

  return {files: declarationFiles.length, specifiers: rewrittenSpecifiers};
}

export {rewriteDeclarationImports};
