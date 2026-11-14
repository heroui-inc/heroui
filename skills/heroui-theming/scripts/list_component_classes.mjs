#!/usr/bin/env node
/**
 * Inspect the BEM surface of HeroUI components from the INSTALLED `@heroui/styles`
 * (no network), so overrides target selectors that exist in the project's version.
 *
 * Usage:
 *   node list_component_classes.mjs                  # list every component stylesheet
 *   node list_component_classes.mjs button           # summary for one component
 *   node list_component_classes.mjs button switch    # several components
 *   node list_component_classes.mjs button --css     # also print the raw CSS
 *   node list_component_classes.mjs button --json    # machine-readable output
 *   node list_component_classes.mjs --dir <path>     # explicit @heroui/styles location
 *
 * The summary lists: blocks, elements, modifiers, state selectors, `data-slot`
 * hooks, component custom properties (with their defaults), and the theme
 * tokens the component reads.
 */
import fs from "node:fs";
import path from "node:path";

import {findStylesDir, stripComments, takeDirArg} from "./_styles_dir.mjs";

const COLOR_UTILITY_PREFIXES = [
  "bg",
  "text",
  "border",
  "ring",
  "ring-offset",
  "outline",
  "fill",
  "stroke",
  "from",
  "via",
  "to",
  "placeholder",
  "divide",
  "caret",
  "decoration",
];

const STATE_PSEUDO_CLASSES = new Set([
  "active",
  "autofill",
  "checked",
  "disabled",
  "focus",
  "focus-visible",
  "focus-within",
  "hover",
  "indeterminate",
  "invalid",
  "placeholder-shown",
  "read-only",
  "required",
]);

/** `.block`, `.block__element` (elements can nest: `.a__b__c`), and an optional `--modifier`. */
const NAME = "[a-z0-9]+(?:-[a-z0-9]+)*";
const CLASS_PATTERN = new RegExp(
  `\\.([a-z][a-z0-9]*(?:-[a-z0-9]+)*)((?:__${NAME})+)?(--${NAME})?(?![\\w-])`,
  "g",
);

const toKebab = (name) =>
  name
    .replace(/\.css$/, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();

/** Returns every selector prelude (the text right before a `{`), skipping at-rules. */
const readSelectors = (css) => {
  const selectors = [];
  let start = 0;

  for (let i = 0; i < css.length; i++) {
    const char = css[i];

    if (char === ";" || char === "}") {
      start = i + 1;
    } else if (char === "{") {
      const prelude = css.slice(start, i).trim();

      if (prelude && !prelude.startsWith("@")) selectors.push(prelude.replace(/\s+/g, " "));
      start = i + 1;
    }
  }

  return selectors;
};

/**
 * Reads themes/shared/theme.css: which Tailwind theme variable points at which HeroUI token,
 * e.g. `--color-field` -> `--field-background`, `--radius-3xl` -> `--radius`.
 */
const readThemeMap = (cssRoot) => {
  const themeCss = stripComments(
    fs.readFileSync(path.join(cssRoot, "themes", "shared", "theme.css"), "utf8"),
  );
  const themeMap = new Map();

  for (const match of themeCss.matchAll(/(--[\w-]+)\s*:\s*[^;]*?var\(\s*(--[\w-]+)/g)) {
    themeMap.set(match[1], match[2]);
  }

  const colorNames = [...themeMap.keys()]
    .filter((name) => name.startsWith("--color-"))
    .map((name) => name.slice("--color-".length))
    .sort((a, b) => b.length - a.length);

  return {colorNames, themeMap};
};

/** HeroUI state utilities (utilities/index.css) and the tokens behind them. */
const STATUS_UTILITY_TOKENS = {
  "focus-field-ring": ["--focus"],
  "focus-ring": ["--focus", "--ring-offset-width"],
  "invalid-field-ring": ["--danger"],
  scrollbar: ["--scrollbar-width", "--scrollbar-color", "--scrollbar-gutter"],
  "scrollbar-thin": ["--scrollbar-thumb", "--scrollbar-track"],
  "status-disabled": ["--disabled-opacity", "--cursor-disabled"],
  "status-focused": ["--focus", "--ring-offset-width"],
  "status-focused-field": ["--focus"],
  "status-invalid-field": ["--danger"],
};

const analyze = (css, {colorNames, themeMap}) => {
  const clean = stripComments(css);
  const selectors = readSelectors(clean);
  const blocks = new Map();
  const states = new Set();
  const slots = new Set();

  const blockEntry = (block) => {
    if (!blocks.has(block)) blocks.set(block, {elements: new Set(), modifiers: new Set()});

    return blocks.get(block);
  };

  for (const selector of selectors) {
    for (const match of selector.matchAll(CLASS_PATTERN)) {
      const [, block, element, modifier] = match;
      const entry = blockEntry(block);

      if (element && modifier) entry.modifiers.add(`.${block}${element}${modifier}`);
      else if (element) entry.elements.add(`.${block}${element}`);
      else if (modifier) entry.modifiers.add(`.${block}${modifier}`);
    }

    for (const match of selector.matchAll(
      /\[((?:data|aria)-[\w-]+)(?:[~|^$*]?=("[^"]*"|[^\]]*))?\]/g,
    )) {
      const [whole, attribute] = match;

      if (attribute === "data-slot") slots.add(whole);
      else states.add(whole);
    }

    for (const match of selector.matchAll(/:([a-z-]+)/g)) {
      if (STATE_PSEUDO_CLASSES.has(match[1])) states.add(`:${match[1]}`);
    }
  }

  const properties = new Map();

  for (const match of clean.matchAll(/(?:^|[;{}])\s*(--[\w-]+)\s*:\s*([^;{}]+)/g)) {
    const [, name, value] = match;

    if (name.startsWith("--tw-")) continue;
    if (!properties.has(name)) properties.set(name, value.replace(/\s+/g, " ").trim());
  }

  const tokens = new Set();
  /** Records the HeroUI token behind a Tailwind theme variable (`--color-field` -> `--field-background`). */
  const addToken = (name) => tokens.add(themeMap.get(name) ?? name);

  for (const match of clean.matchAll(/var\(\s*(--[\w-]+)/g)) {
    if (!properties.has(match[1]) && !match[1].startsWith("--tw-")) addToken(match[1]);
  }

  for (const match of clean.matchAll(/@apply\s+([^;]+);/g)) {
    for (const rawUtility of match[1].split(/\s+/)) {
      const utility = rawUtility
        .split(":")
        .pop()
        .replace(/^!|!$/g, "")
        .replace(/\/[\w.[\]%-]+$/, "");

      if (STATUS_UTILITY_TOKENS[utility]) {
        for (const token of STATUS_UTILITY_TOKENS[utility]) tokens.add(token);
        continue;
      }
      if (/^shadow-(surface|overlay|field)$/.test(utility)) {
        addToken(`--${utility}`);
        continue;
      }
      if (/^rounded(-[a-z]{1,2})?-(xs|sm|md|lg|xl|2xl|3xl|4xl)$/.test(utility)) {
        tokens.add("--radius");
        continue;
      }
      if (/^rounded(-[a-z]{1,2})?-field$/.test(utility)) {
        addToken("--radius-field");
        continue;
      }
      for (const prefix of COLOR_UTILITY_PREFIXES) {
        if (!utility.startsWith(`${prefix}-`)) continue;
        const color = colorNames.find((name) => utility === `${prefix}-${name}`);

        if (color) addToken(`--color-${color}`);
      }
    }
  }

  return {
    blocks: [...blocks].map(([name, entry]) => ({
      elements: [...entry.elements].sort(),
      modifiers: [...entry.modifiers].sort(),
      name: `.${name}`,
    })),
    customProperties: [...properties].map(([name, value]) => ({name, value})),
    slots: [...slots].sort(),
    states: [...states].sort(),
    tokens: [...tokens].sort(),
  };
};

const printList = (title, items) => {
  if (items.length === 0) return;
  console.log(`\n${title}`);
  for (const item of items) console.log(`  ${item}`);
};

const main = () => {
  const {dir, rest} = takeDirArg(process.argv.slice(2));
  const flags = new Set(rest.filter((arg) => arg.startsWith("--")));
  const names = rest.filter((arg) => !arg.startsWith("--")).map(toKebab);

  const {cssRoot, version} = findStylesDir(dir);
  const componentsDir = path.join(cssRoot, "components");
  const available = fs
    .readdirSync(componentsDir)
    .filter((file) => file.endsWith(".css") && file !== "index.css")
    .map((file) => file.replace(/\.css$/, ""))
    .sort();

  if (names.length === 0) {
    console.log(`# @heroui/styles ${version}`);
    console.log(`# ${componentsDir}`);
    console.log(`# ${available.length} component stylesheets\n`);
    console.log(available.join("\n"));

    return;
  }

  const theme = readThemeMap(cssRoot);
  const results = [];

  for (const name of names) {
    if (!available.includes(name)) {
      const hints = available.filter((item) => item.includes(name) || name.includes(item));

      console.error(
        `# No stylesheet for "${name}".` +
          (hints.length
            ? ` Did you mean: ${hints.join(", ")}?`
            : " Run without arguments to list all."),
      );
      continue;
    }

    const file = path.join(componentsDir, `${name}.css`);
    const css = fs.readFileSync(file, "utf8");

    results.push({component: name, file, ...analyze(css, theme), css});
  }

  if (flags.has("--json")) {
    const payload = results.map(({css, ...result}) =>
      flags.has("--css") ? {...result, css} : result,
    );

    console.log(JSON.stringify({components: payload, version}, null, 2));

    return;
  }

  for (const result of results) {
    console.log(`\n# ${result.component} (@heroui/styles ${version})`);
    console.log(`# ${result.file}`);

    for (const block of result.blocks) {
      console.log(`\nBlock ${block.name}`);
      if (block.elements.length) console.log(`  elements:  ${block.elements.join("  ")}`);
      if (block.modifiers.length) console.log(`  modifiers: ${block.modifiers.join("  ")}`);
    }

    printList("State selectors (style the pseudo-class AND the data attribute)", result.states);
    printList("data-slot hooks", result.slots);
    printList(
      "Component custom properties (set them on the component class, not on :root)",
      result.customProperties.map((property) => `${property.name}: ${property.value}`),
    );
    printList("Theme tokens read by this component", result.tokens);

    if (flags.has("--css")) {
      console.log("\n/* ---- source ---- */");
      console.log(result.css);
    }
  }

  if (results.length === 0) process.exit(1);
};

try {
  main();
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
