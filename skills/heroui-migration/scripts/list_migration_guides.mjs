#!/usr/bin/env node
/**
 * List all available HeroUI v2 to v3 component migration guides.
 *
 * Usage:
 *   node list_migration_guides.mjs
 *
 * Output:
 *   List of component names that have migration guides
 *
 * Note: Keep in sync with migration-mcp list-migration-guides.ts when adding components.
 */

// Component migration guides available - must match migration-mcp list-migration-guides.ts
const AVAILABLE_COMPONENTS = [
  "accordion",
  "alert",
  "autocomplete",
  "avatar",
  "breadcrumbs",
  "button",
  "button-group",
  "card",
  "checkbox",
  "checkbox-group",
  "chip",
  "code",
  "divider",
  "dropdown",
  "form",
  "image",
  "input",
  "input-otp",
  "kbd",
  "link",
  "listbox",
  "modal",
  "navbar",
  "numberinput",
  "popover",
  "radio",
  "radio-group",
  "scroll-shadow",
  "select",
  "skeleton",
  "slider",
  "snippet",
  "spacer",
  "spinner",
  "switch",
  "tabs",
  "toast",
  "tooltip",
  "user",
];

function main() {
  const componentsList = AVAILABLE_COMPONENTS.map((name) => `  - ${name}`).join("\n");

  console.log(
    `# Available Component Migration Guides\n\nFound ${AVAILABLE_COMPONENTS.length} component migration guides:\n\n${componentsList}\n\nUse get_component_migration_guides.mjs with component names to fetch specific guides.\nExample: node get_component_migration_guides.mjs button card modal`,
  );
}

main();
