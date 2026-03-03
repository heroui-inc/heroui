#!/usr/bin/env node
/**
 * Get the main migration workflow guide (full or incremental) for HeroUI v2 to v3.
 *
 * Usage:
 *   node get_migration_guide.mjs [full|incremental]
 *
 * Default: full
 *
 * Output:
 *   MDX migration guide content
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
  const arg = (process.argv[2] || "full").toLowerCase();
  const migrationType = arg === "incremental" ? "incremental" : "full";
  const filename =
    migrationType === "incremental" ? "agent-guide-incremental.mdx" : "agent-guide-full.mdx";

  console.error(`# Fetching ${migrationType} migration guide...`);

  try {
    const content = await fetchDoc(filename);
    const title =
      migrationType === "incremental"
        ? "HeroUI v2 to v3 Agent Migration Guide - Incremental Migration"
        : "HeroUI v2 to v3 Agent Migration Guide - Full Migration";

    console.log(`# ${title}\n\n**Source:** ${DOCS_BASE}/${filename}\n\n---\n\n${content}`);
  } catch (error) {
    console.error(`# Error: ${error.message}`);
    process.exit(1);
  }
}

main();
