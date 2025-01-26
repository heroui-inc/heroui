#!/usr/bin/env node

import fs from "fs";
import path from "path";

import yaml from "js-yaml";

// -----------------------------------------------------------------------------
// 1. CONFIGURATION
// -----------------------------------------------------------------------------
// Path to your .mdx docs folder
const MDX_FOLDER_PATH = "../../content/docs/components";
// Output file for the generated YAML
const OUTPUT_YAML_PATH = "./openui-spec.yaml";

// ANSI colors for console feedback
const COLORS = {
  green: "\x1b[32m",
  red: "\x1b[31m",
  reset: "\x1b[0m"
};

// Regex to capture all <APITable data={...}> blocks, allowing for newlines/spaces.
// The `(\[[\s\S]*?\])` group extracts the array of objects from data={ ... }.
const APITABLE_REGEX =
  /<APITable[\s\S]*?data=\{\s*(\[[\s\S]*?\])\s*\}[\s\S]*?(?:\/>|>\s*<\/APITable>)/g;

// We'll store the overall Open UI spec in this object.
const openUISpec = {
  name: "HeroUI",
  components: {}
};

// -----------------------------------------------------------------------------
// 2. TYPE PARSING LOGIC
// -----------------------------------------------------------------------------
/**
 * Attempts to parse a union type such as `'sm' | 'md' | 'lg'`.
 * Returns an array of string literals if it matches, otherwise null.
 */
function tryParseStringUnion(typeStr) {
  // Strip surrounding whitespace
  const trimmed = typeStr.trim();

  // A simple check to see if it's something like:
  // `'sm' | 'md' | 'lg'` or "sm | md | lg"
  // We'll accept either quoted or unquoted, as sometimes you see `'primary' | 'secondary'`.
  const parts = trimmed.split("|").map((p) => p.trim().replace(/^'|'$/g, "")); // remove leading/trailing single quotes

  // If there's more than one part and none are obviously typed (e.g., "ReactNode", "boolean"), treat them as an enum
  if (parts.length > 1 && parts.every((p) => /^[\w-]+$/.test(p))) {
    // We have a clean union of simple literal values
    return parts;
  }

  return null;
}

interface TypeObject {
  type: string;
  enum?: Array<string>;
  default?: string | number | boolean;
}

/**
 * Converts a "type" + "default" into an appropriate YAML structure:
 * - If it's a union of string constants, produce `{ enum: [...], type: string, default?: ... }`.
 * - If it's obviously "boolean" or `'true' | 'false'`, produce `{ type: boolean, default?: ... }`.
 * - If it's obviously "number", produce `{ type: number, default?: ... }`.
 * - Otherwise, return a single string if there's no default, or an object if there is a default.
 */
function convertPropOrEventToYamlType(typeStr: string, defaultValue: string): string | TypeObject {
  const trimmedType = typeStr.trim();

  // Attempt union parse
  const union = tryParseStringUnion(trimmedType);

  if (union) {
    // If it's specifically ['true','false'], treat that as a boolean
    if (union.length === 2 && union.includes("true") && union.includes("false")) {
      const obj: TypeObject = { type: "boolean" };

      if (defaultValue && defaultValue !== "-" && /^true|false$/.test(defaultValue)) {
        obj.default = defaultValue === "true";
      }

      return obj;
    }

    // Otherwise it's a string union
    const obj: TypeObject = {
      type: "string",
      enum: union
    };

    if (defaultValue && defaultValue !== "-" && union.includes(defaultValue)) {
      obj.default = defaultValue;
    }

    return obj;
  }

  // If it's a direct "boolean"
  if (trimmedType === "boolean") {
    const obj: TypeObject = { type: "boolean" };

    if (defaultValue && defaultValue !== "-" && /^true|false$/.test(defaultValue)) {
      obj.default = defaultValue === "true";
    }

    return obj;
  }

  // If it's a direct "number"
  if (trimmedType === "number") {
    const obj: TypeObject = { type: "number" };

    if (defaultValue && defaultValue !== "-" && !isNaN(Number(defaultValue))) {
      obj.default = Number(defaultValue);
    }

    return obj;
  }

  // If it's a single type (like "ReactNode") and there's no meaningful default, just return a string
  if (!defaultValue || defaultValue === "-") {
    return trimmedType;
  }

  // If there's a default, return an object
  return {
    type: trimmedType,
    default: defaultValue
  };
}

// -----------------------------------------------------------------------------
// 3. MAIN LOGIC
// -----------------------------------------------------------------------------
function main() {
  // Read all .mdx files
  let mdxFiles: Array<string> = [];

  try {
    mdxFiles = fs
      .readdirSync(MDX_FOLDER_PATH)
      .filter((file) => file.endsWith(".mdx"));
  } catch (err) {
    console.log(
      COLORS.red +
        `Failed to read directory "${MDX_FOLDER_PATH}". Make sure the path is correct.` +
        COLORS.reset
    );
    process.exit(1);
  }

  if (mdxFiles.length === 0) {
    console.log(
      COLORS.red + "No .mdx files found in:" + COLORS.reset,
      MDX_FOLDER_PATH
    );

    return;
  }

  // Iterate over each file
  mdxFiles.forEach((filename) => {
    const componentName = path.basename(filename, ".mdx");

    console.log(
      `\n${COLORS.green}Processing file: ${filename}, component: ${componentName}${COLORS.reset}`
    );

    const filePath = path.join(MDX_FOLDER_PATH, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");

    const matches = [...fileContent.matchAll(APITABLE_REGEX)];

    if (matches.length === 0) {
      console.log(
        `${COLORS.red}No <APITable> blocks found in ${filename}. Skipping...${COLORS.reset}`
      );

      return;
    }

    // We expect two APITable blocks: first for Props, second for Events
    // but let's handle a short count gracefully.
    if (matches.length < 2) {
      console.log(
        `${COLORS.red}Found only ${matches.length} <APITable> in ${filename}. Expected 2.${COLORS.reset}`
      );
    }

    const [propsMatch, eventsMatch] = matches;

    // Helper function to parse the JS array objects
    function parseDataArray(str) {
      try {
        // Wrap it in parentheses so eval sees it as an expression
        return eval("(" + str + ")");
      } catch (err) {
        console.error(
          `${COLORS.red}Failed to parse data array:\n${str}\n${err}${COLORS.reset}`
        );

        return null;
      }
    }

    // Extract the group for each
    const propsDataString = propsMatch?.[1];
    const eventsDataString = eventsMatch?.[1];

    const propsData = propsDataString ? parseDataArray(propsDataString) : null;
    const eventsData = eventsDataString ? parseDataArray(eventsDataString) : null;

    // Build the structure for this component
    openUISpec.components[componentName] = {
      package: `@heroui/${componentName}`,
      props: {},
      events: {}
    };

    // Handle props
    if (propsData && Array.isArray(propsData)) {
      propsData.forEach((propDef) => {
        const {
          attribute: propName,
          type: typeStr = "",
          default: defaultVal = "-"
        } = propDef;

        // Convert the type + default to a suitable YAML-friendly structure
        const yamlProp = convertPropOrEventToYamlType(typeStr, defaultVal);

        openUISpec.components[componentName].props[propName] = yamlProp;
      });
      console.log(
        `${COLORS.green}- Done processing props data for: ${filename}, component: ${componentName}${COLORS.reset}`
      );
    }

    // Handle events
    if (eventsData && Array.isArray(eventsData)) {
      eventsData.forEach((eventDef) => {
        const {
          attribute: eventName,
          type: typeStr = "",
          default: defaultVal = "-"
        } = eventDef;

        // For events, we'll usually store the entire function signature as a single string
        // But if you prefer to parse it, you can reuse convertPropOrEventToYamlType.
        // For now, treat them as just strings:
        if (defaultVal !== "-" && defaultVal.trim() !== "") {
          // Some events might have a default? Rare, but we can handle similarly:
          openUISpec.components[componentName].events[eventName] =
            convertPropOrEventToYamlType(typeStr, defaultVal);
        } else {
          openUISpec.components[componentName].events[eventName] = typeStr.trim();
        }
      });
      console.log(
        `${COLORS.green}- Done processing events data for: ${filename}, component: ${componentName}${COLORS.reset}`
      );
    }
  });

  // Now write out a single "openui-spec.yaml" file
  try {
    const yamlString = yaml.dump(openUISpec, {
      lineWidth: 120
    });

    fs.writeFileSync(OUTPUT_YAML_PATH, yamlString, "utf8");
    console.log(
      COLORS.green +
        `\nSuccessfully generated Open UI spec at: ${OUTPUT_YAML_PATH}` +
        COLORS.reset
    );
  } catch (err) {
    console.error(COLORS.red + "Failed to write YAML:" + COLORS.reset, err);
  }
}

// -----------------------------------------------------------------------------
// 4. RUN
// -----------------------------------------------------------------------------
main();
