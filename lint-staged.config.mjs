import fs from "fs";
import {dirname, relative, resolve} from "path";

import {ESLint} from "eslint";

const projectRoot = process.cwd();

// Eslint mode: "Experimental" | "Legacy"
const LINT_MODE = "Experimental";

const removeIgnoredFilesNew = async (files) => {
  try {
    const eslint = new ESLint();
    const cwd = process.cwd();

    const relativePaths = files.map((file) => relative(cwd, file));
    const isIgnored = await Promise.all(relativePaths.map((file) => eslint.isPathIgnored(file)));

    return files.filter((_, i) => !isIgnored[i]).join(" ");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  }
};

function findPackageRoot(file) {
  let dir = dirname(file);

  while (dir !== "/") {
    if (fs.existsSync(`${dir}/package.json`)) return dir;
    const parentDir = dirname(dir);

    if (parentDir === dir) break;
    dir = parentDir;
  }

  return projectRoot;
}

async function removeIgnoredFilesLegacy(files, eslint) {
  const isIgnored = await Promise.all(files.map((file) => eslint.isPathIgnored(file)));

  return files.filter((_, i) => !isIgnored[i]);
}

const lintStaged = {
  "**/*.{cjs,mjs,js,ts,jsx,tsx}": async (files) => {
    if (LINT_MODE === "Experimental") {
      // use ESLint with experimental configuration file resolution
      const filesToLint = await removeIgnoredFilesNew(files);

      return [`eslint --flag v10_config_lookup_from_file --max-warnings=0 --fix ${filesToLint}`];
    }

    if (LINT_MODE === "Legacy") {
      // Legacy with group files by package root and resolve ESLint config
      const filesByPackage = new Map();

      for (const file of files) {
        const pkgRoot = findPackageRoot(file);

        if (!filesByPackage.has(pkgRoot)) filesByPackage.set(pkgRoot, []);
        filesByPackage.get(pkgRoot).push(file);
      }

      const commands = [];

      for (const [pkgRoot, pkgFiles] of filesByPackage.entries()) {
        // Check if the package has its own eslint.config.mjs
        const configPath = fs.existsSync(resolve(pkgRoot, "eslint.config.mjs"))
          ? resolve(pkgRoot, "eslint.config.mjs")
          : resolve(projectRoot, "eslint.config.mjs");

        const eslint = new ESLint({cwd: pkgRoot, overrideConfigFile: configPath});
        const filesToLint = await removeIgnoredFilesLegacy(pkgFiles, eslint);

        if (filesToLint.length) {
          commands.push(
            `eslint --config ${configPath} --max-warnings=0 --fix ${filesToLint.join(" ")}`,
          );
        }
      }

      return commands;
    }

    return [];
  },

  "**/*.{html,css,scss,json,md}": async (files) => {
    return [`prettier --ignore-path .prettierignore --write ${files.join(" ")}`];
  },
};

export default lintStaged;
