/**
 * Locate the docs that ship inside the INSTALLED `@heroui/react` package
 * (`node_modules/@heroui/react/docs`), so what an agent reads matches the version the project runs.
 *
 * Only the current project counts: the nearest `package.json` above the working directory must
 * depend on `@heroui/react`. Without that check, a parent folder's install (another project, a
 * home-directory `node_modules`) would be reported as "installed" with the wrong version.
 *
 * Set HEROUI_DOCS_SOURCE=remote to skip the installed docs.
 */
import {existsSync, readFileSync} from "node:fs";
import {dirname, join} from "node:path";

const DEPENDENCY_FIELDS = ["dependencies", "devDependencies", "peerDependencies"];

const readJson = (file) => {
  try {
    return JSON.parse(readFileSync(file, "utf-8"));
  } catch {
    return null;
  }
};

/** Walks up from `start` to the filesystem root, yielding every directory. */
function* ancestors(start) {
  for (let dir = start; ; dir = dirname(dir)) {
    yield dir;
    if (dirname(dir) === dir) return;
  }
}

/** True when the nearest `package.json` above `cwd` declares `@heroui/react`. */
const projectUsesHeroUI = (cwd) => {
  for (const dir of ancestors(cwd)) {
    const pkg = existsSync(join(dir, "package.json")) && readJson(join(dir, "package.json"));

    if (pkg) return DEPENDENCY_FIELDS.some((field) => pkg[field]?.["@heroui/react"]);
  }

  return false;
};

/**
 * Returns `{docsDir, version}` for the installed docs, or null when the network should be used.
 * The search walks up like Node's module resolution, so hoisted workspace installs are found.
 */
export const findLocalDocs = (cwd = process.cwd()) => {
  if (process.env.HEROUI_DOCS_SOURCE === "remote") return null;
  if (!projectUsesHeroUI(cwd)) return null;

  for (const dir of ancestors(cwd)) {
    const docsDir = join(dir, "node_modules", "@heroui", "react", "docs");

    if (existsSync(join(docsDir, "llms.txt"))) {
      const version = readJson(join(docsDir, "..", "package.json"))?.version ?? "unknown";

      return {docsDir, version};
    }
  }

  return null;
};
