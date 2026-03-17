#!/usr/bin/env node
/**
 * Get migration guides for HeroUI components (v2 to v3).
 *
 * Usage:
 *   node get_component_migration_guides.mjs button
 *   node get_component_migration_guides.mjs button card modal
 *
 * Output:
 *   MDX migration guide content for each component
 */

const DOCS_BASE =
  process.env.HEROUI_MIGRATION_DOCS_BASE ||
  "https://heroui-git-docs-migration-heroui.vercel.app/docs/react/migration";
const APP_PARAM = "app=migration-skills";

/**
 * Convert PascalCase or mixed case to kebab-case.
 */
function toKebabCase(name) {
  return name
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase()
    .trim();
}

async function fetchDoc(filename) {
  const url = `${DOCS_BASE}/${filename}?${APP_PARAM}`;

  try {
    const response = await fetch(url, {
      headers: {"User-Agent": "HeroUI-Migration-Skill/1.0"},
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.text();
  } catch (error) {
    throw new Error(error.message);
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error("Usage: node get_component_migration_guides.mjs <Component1> [Component2] ...");
    console.error("Example: node get_component_migration_guides.mjs button card modal");
    console.error("\nUse list_migration_guides.mjs to see all available components.");
    process.exit(1);
  }

  const components = args.map((c) => toKebabCase(c));

  console.error(`# Fetching migration guides for: ${components.join(", ")}...`);

  const results = [];

  for (const component of components) {
    const filename = `${component}.mdx`;

    try {
      const content = await fetchDoc(filename);
      const title = component.charAt(0).toUpperCase() + component.slice(1).replace(/-/g, " ");

      results.push({
        component,
        content: `# ${title} Migration Guide\n\n**Component:** ${component}\n**Source:** ${DOCS_BASE}/${filename}\n\n---\n\n${content}`,
      });
    } catch (error) {
      results.push({
        component,
        error: error.message,
      });
    }
  }

  const failed = results.filter((r) => r.error);

  if (failed.length > 0) {
    failed.forEach((r) => console.error(`# Error for ${r.component}: ${r.error}`));
  }

  if (results.length === 1) {
    const r = results[0];

    if (r.content) {
      console.log(r.content);
    } else {
      console.log(JSON.stringify(r, null, 2));
      process.exit(1);
    }
  } else {
    const output = results
      .map((r) => (r.content ? r.content : `# ${r.component} Migration Guide\n\nError: ${r.error}`))
      .join("\n\n---\n\n");

    console.log(output);
    if (failed.length === results.length) {
      process.exit(1);
    }
  }
}

main();
