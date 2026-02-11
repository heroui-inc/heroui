#!/usr/bin/env node
/**
 * Get the styling migration guide for HeroUI v2 to v3.
 *
 * Usage:
 *   node get_styling_migration_guide.mjs
 *
 * Output:
 *   MDX styling migration guide content
 */

const DOCS_BASE =
  process.env.HEROUI_MIGRATION_DOCS_BASE ||
  "https://heroui-git-docs-migration-heroui.vercel.app/docs/react/migration";
const APP_PARAM = "app=migration-skills";

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
    throw new Error(`Failed to fetch ${filename}: ${error.message}`);
  }
}

async function main() {
  const filename = "styling.mdx";

  console.error("# Fetching styling migration guide...");

  try {
    const content = await fetchDoc(filename);

    console.log(
      `# HeroUI v2 to v3 Styling Migration Guide\n\n**Source:** ${DOCS_BASE}/${filename}\n\n---\n\n${content}`,
    );
  } catch (error) {
    console.error(`# Error: ${error.message}`);
    process.exit(1);
  }
}

main();
