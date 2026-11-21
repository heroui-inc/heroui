/**
 * Locate the CSS root of the INSTALLED `@heroui/styles` package, so the output
 * always matches the version the project actually runs. No network access.
 *
 * Resolution order:
 *   1. `--dir <path>` argument or `HEROUI_STYLES_DIR` environment variable
 *   2. `@heroui/styles` resolved from the current working directory
 *   3. `@heroui/styles` resolved through `@heroui/react` (transitive install)
 *   4. A `packages/styles` folder in a parent directory (HeroUI monorepo checkout)
 *
 * The published package keeps its CSS in `dist/`; a source checkout keeps it
 * at the package root. Both layouts are supported (the package root wins when
 * both exist, since `dist/` can be stale in a checkout).
 */
import fs from "node:fs";
import {createRequire} from "node:module";
import path from "node:path";

const hasCss = (dir) => fs.existsSync(path.join(dir, "components", "button.css"));

/** Returns the folder that holds `components/`, `themes/`, `base/`. */
const cssRootOf = (packageDir) => {
  for (const candidate of [packageDir, path.join(packageDir, "dist")]) {
    if (hasCss(candidate)) return candidate;
  }

  return null;
};

const resolvePackageDir = (specifier, fromDir) => {
  try {
    const require = createRequire(path.join(fromDir, "noop.js"));

    return path.dirname(require.resolve(`${specifier}/package.json`));
  } catch {
    return null;
  }
};

const readVersion = (cssRoot) => {
  for (const dir of [cssRoot, path.dirname(cssRoot)]) {
    try {
      const pkg = JSON.parse(fs.readFileSync(path.join(dir, "package.json"), "utf8"));

      if (pkg.name === "@heroui/styles") return pkg.version;
    } catch {
      // keep looking
    }
  }

  return "unknown";
};

/**
 * Removes `--dir <path>` from an argv array and returns the remaining arguments
 * together with the explicit directory, if one was given.
 */
export const takeDirArg = (argv) => {
  const rest = [];
  let dir = process.env.HEROUI_STYLES_DIR || null;

  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--dir") {
      dir = argv[++i] ?? null;
    } else if (argv[i].startsWith("--dir=")) {
      dir = argv[i].slice("--dir=".length);
    } else {
      rest.push(argv[i]);
    }
  }

  return {dir, rest};
};

export const findStylesDir = (explicitDir) => {
  const cwd = process.cwd();

  if (explicitDir) {
    const cssRoot = cssRootOf(path.resolve(cwd, explicitDir));

    if (!cssRoot) {
      throw new Error(`No HeroUI CSS found in "${explicitDir}" (expected components/button.css).`);
    }

    return {cssRoot, version: readVersion(cssRoot)};
  }

  const packageDirs = [resolvePackageDir("@heroui/styles", cwd)];
  const reactDir = resolvePackageDir("@heroui/react", cwd);

  if (reactDir) packageDirs.push(resolvePackageDir("@heroui/styles", reactDir));

  for (let dir = cwd; ; dir = path.dirname(dir)) {
    packageDirs.push(path.join(dir, "node_modules", "@heroui", "styles"));
    packageDirs.push(path.join(dir, "packages", "styles"));
    if (dir === path.dirname(dir)) break;
  }

  for (const packageDir of packageDirs) {
    const cssRoot = packageDir && cssRootOf(packageDir);

    if (cssRoot) return {cssRoot, version: readVersion(cssRoot)};
  }

  throw new Error(
    "Could not find an installed @heroui/styles. Run this from the project root " +
      "(after installing dependencies), or pass --dir <path-to-@heroui/styles>.",
  );
};

/** Strips block comments so selectors and declarations can be scanned safely. */
export const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, "");
