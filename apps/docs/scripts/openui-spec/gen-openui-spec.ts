/* eslint-disable no-console */
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

// -----------------------------------------------------------------------------
// 1. CONFIGURATION
// -----------------------------------------------------------------------------
const MDX_FOLDER_PATH = "../../content/docs/components";
const OUTPUT_YAML_PATH = "./openui-spec.yaml";

// ANSI colors for console feedback
const COLORS = {
  green: "\x1b[32m",
  red: "\x1b[31m",
  reset: "\x1b[0m"
};

// Regex to capture all <APITable data={...}> blocks, allowing for newlines/spaces.
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
function tryParseStringUnion(typeStr: string): string[] | null {
  const trimmed = typeStr.trim();
  // Example patterns: `'sm' | 'md' | 'lg'` or `sm | md | lg`
  // We'll remove any leading/trailing quotes for each part
  const parts = trimmed.split("|").map((p) => p.trim().replace(/^'|'$/g, ""));

  // If there's more than one part, and all are simple words (no punctuation besides -), treat as enum
  if (parts.length > 1 && parts.every((p) => /^[\w-]+$/.test(p))) {
    return parts;
  }
  return null;
}

interface TypeObject {
  type: string;
  enum?: string[];
  default?: string | number | boolean;
}

/**
 * Converts a "type" + "default" into an appropriate object or string:
 * - If it's a union of string constants, produce { type: "string", enum: [...], default?: ... }.
 * - If it's `'true' | 'false'`, produce { type: "boolean", default?: ... }.
 * - If it's "number", produce { type: "number", default?: ... }.
 * - If there's no recognized union or single basic type, return either a plain string or an object with "type" and "default".
 */
function convertPropOrEventToYamlType(
  typeStr: string,
  defaultValue: string
): string | TypeObject {
  const trimmedType = typeStr.trim();
  const union = tryParseStringUnion(trimmedType);

  if (union) {
    // Handle 'true' | 'false' -> boolean
    if (union.length === 2 && union.includes("true") && union.includes("false")) {
      const obj: TypeObject = { type: "boolean" };
      if (defaultValue && defaultValue !== "-" && /^true|false$/.test(defaultValue)) {
        obj.default = defaultValue === "true";
      }
      return obj;
    }

    // Otherwise treat it as a string union
    const obj: TypeObject = {
      type: "string",
      enum: union
    };
    if (defaultValue && defaultValue !== "-" && union.includes(defaultValue)) {
      obj.default = defaultValue;
    }
    return obj;
  }

  // Direct "boolean"
  if (trimmedType === "boolean") {
    const obj: TypeObject = { type: "boolean" };
    if (defaultValue && defaultValue !== "-" && /^true|false$/.test(defaultValue)) {
      obj.default = defaultValue === "true";
    }
    return obj;
  }

  // Direct "number"
  if (trimmedType === "number") {
    const obj: TypeObject = { type: "number" };
    if (defaultValue && defaultValue !== "-" && !isNaN(Number(defaultValue))) {
      obj.default = Number(defaultValue);
    }
    return obj;
  }

  // If no default, just return a simple string
  if (!defaultValue || defaultValue === "-") {
    return trimmedType;
  }

  // Otherwise, return an object with type + default
  return {
    type: trimmedType,
    default: defaultValue
  };
}

// -----------------------------------------------------------------------------
// 3. MAIN LOGIC
// -----------------------------------------------------------------------------
function main() {
  let mdxFiles: string[] = [];
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

    // We expect two APITable blocks: first (props), second (events)
    if (matches.length < 2) {
      console.log(
        `${COLORS.red}Found only ${matches.length} <APITable> in ${filename}. Expected 2.${COLORS.reset}`
      );
    }

    const [propsMatch, eventsMatch] = matches || [];

    function parseDataArray(str: string) {
      try {
        // Use eval on the array contents
        return eval("(" + str + ")");
      } catch (err) {
        console.error(
          `${COLORS.red}Failed to parse data array:\n${str}\n${err}${COLORS.reset}`
        );
        return null;
      }
    }

    const propsDataString = propsMatch?.[1];
    const eventsDataString = eventsMatch?.[1];

    const propsData = propsDataString ? parseDataArray(propsDataString) : null;
    const eventsData = eventsDataString ? parseDataArray(eventsDataString) : null;

    openUISpec.components[componentName] = {
      package: `@heroui/${componentName}`,
      props: {},
      events: {}
    };

    // Process Props
    if (propsData && Array.isArray(propsData)) {
      propsData.forEach((propDef) => {
        const {
          attribute: propName,
          type: typeStr = "",
          default: defaultVal = "-",
          description: desc = ""
        } = propDef;

        // Convert the type + default
        const converted = convertPropOrEventToYamlType(typeStr, defaultVal);

        // If the converter returned a string, we wrap it in an object so we can add a description
        if (typeof converted === "string") {
          openUISpec.components[componentName].props[propName] = {
            type: converted,
            description: desc
          };
        } else {
          // If it's an object, add the description property
          openUISpec.components[componentName].props[propName] = {
            ...converted,
            description: desc
          };
        }
      });
      console.log(
        `${COLORS.green}- Done processing props for: ${filename}, component: ${componentName}${COLORS.reset}`
      );
    }

    // Process Events
    if (eventsData && Array.isArray(eventsData)) {
      eventsData.forEach((eventDef) => {
        const {
          attribute: eventName,
          type: typeStr = "",
          default: defaultVal = "-",
          description: desc = ""
        } = eventDef;

        // Typically store the event signature as a string
        // But we can also handle the default and description similarly
        // If there's a "default" or you want to parse it as well, you can reuse the same converter logic
        const baseEventVal =
          defaultVal !== "-" && defaultVal.trim() !== ""
            ? convertPropOrEventToYamlType(typeStr, defaultVal)
            : typeStr.trim();

        if (typeof baseEventVal === "string") {
          openUISpec.components[componentName].events[eventName] = {
            type: baseEventVal,
            description: desc
          };
        } else {
          // It's an object from the converter. Add 'description'
          openUISpec.components[componentName].events[eventName] = {
            ...baseEventVal,
            description: desc
          };
        }
      });
      console.log(
        `${COLORS.green}- Done processing events for: ${filename}, component: ${componentName}${COLORS.reset}`
      );
    }
  });

  // Finally write out a single openui-spec.yaml file
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
