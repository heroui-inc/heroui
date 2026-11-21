#!/usr/bin/env node
/**
 * List the theme tokens of the INSTALLED `@heroui/styles` (no network).
 *
 * Usage:
 *   node list_tokens.mjs                 # every block: shared, light, dark + Tailwind mapping
 *   node list_tokens.mjs --mode dark     # only the dark block
 *   node list_tokens.mjs --names         # token names only, one per line (deduplicated)
 *   node list_tokens.mjs --json          # machine-readable output
 *   node list_tokens.mjs --dir <path>    # explicit @heroui/styles location
 *
 * Reads `themes/default/variables.css` (token values per mode) and
 * `themes/shared/theme.css` (token -> Tailwind theme variable mapping).
 */
import fs from "node:fs";
import path from "node:path";

import {findStylesDir, stripComments, takeDirArg} from "./_styles_dir.mjs";

/** Splits `css` into top-level `{selector, body}` rules, descending into at-rules. */
const readRules = (css) => {
  const rules = [];
  let depth = 0;
  let start = 0;
  let prelude = "";
  let bodyStart = 0;

  for (let i = 0; i < css.length; i++) {
    const char = css[i];

    if (char === "{") {
      if (depth === 0) {
        prelude = css.slice(start, i).trim();
        bodyStart = i + 1;
      }
      depth++;
    } else if (char === "}") {
      depth--;
      if (depth === 0) {
        const body = css.slice(bodyStart, i);

        if (prelude.startsWith("@layer") || prelude.startsWith("@media")) {
          rules.push(...readRules(body));
        } else {
          rules.push({body, selector: prelude.replace(/\s+/g, " ")});
        }
        start = i + 1;
      }
    }
  }

  return rules;
};

/** Reads `--name: value;` declarations at the top level of a rule body. */
const readDeclarations = (body) => {
  const declarations = [];
  let depth = 0;
  let current = "";

  for (const char of body) {
    if (char === "{") depth++;
    if (char === "}") {
      depth--;
      current = "";
      continue;
    }
    if (depth > 0) continue;
    if (char === ";") {
      const match = current.match(/^\s*(--[\w-]+)\s*:\s*([\s\S]+)$/);

      if (match) declarations.push({name: match[1], value: match[2].replace(/\s+/g, " ").trim()});
      current = "";
    } else {
      current += char;
    }
  }

  return declarations;
};

const modeOf = (selector) => {
  if (selector.startsWith("@theme")) return "tailwind";
  if (selector.includes("data-vibrant-palette")) return "vibrant";
  if (/\.dark|data-theme="dark"/.test(selector)) return "dark";
  if (/\.light|data-theme="light"/.test(selector)) return "light";

  return "shared";
};

const main = () => {
  const {dir, rest} = takeDirArg(process.argv.slice(2));
  const asJson = rest.includes("--json");
  const namesOnly = rest.includes("--names");
  const modeIndex = rest.indexOf("--mode");
  const onlyMode = modeIndex === -1 ? null : rest[modeIndex + 1];

  const {cssRoot, version} = findStylesDir(dir);
  const variablesPath = path.join(cssRoot, "themes", "default", "variables.css");
  const themePath = path.join(cssRoot, "themes", "shared", "theme.css");

  const blocks = [];

  for (const file of [variablesPath, themePath]) {
    for (const rule of readRules(stripComments(fs.readFileSync(file, "utf8")))) {
      const mode = modeOf(rule.selector);

      if (mode === "vibrant") continue;
      const existing = blocks.find((block) => block.mode === mode);
      const tokens = readDeclarations(rule.body);

      if (existing) existing.tokens.push(...tokens);
      else blocks.push({mode, selector: rule.selector, tokens});
    }
  }

  const selected = onlyMode ? blocks.filter((block) => block.mode === onlyMode) : blocks;

  if (asJson) {
    console.log(JSON.stringify({blocks: selected, cssRoot, version}, null, 2));

    return;
  }

  if (namesOnly) {
    const names = new Set(selected.flatMap((block) => block.tokens.map((token) => token.name)));

    console.log([...names].join("\n"));

    return;
  }

  console.log(`/* @heroui/styles ${version} */`);
  console.log(`/* ${variablesPath} */`);
  console.log(`/* ${themePath} */`);

  const titles = {
    dark: "Dark mode tokens",
    light: "Light mode tokens",
    shared: "Shared tokens (same in every mode)",
    tailwind: "Tailwind mapping (@theme inline): theme variable -> HeroUI token",
  };

  for (const block of selected) {
    console.log(`\n/* ${titles[block.mode]} */`);
    console.log(`${block.selector} {`);
    for (const token of block.tokens) console.log(`  ${token.name}: ${token.value};`);
    console.log("}");
  }
};

try {
  main();
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
