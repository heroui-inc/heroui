#!/usr/bin/env node
/**
 * Get non-component HeroUI documentation (guides, theming, releases).
 *
 * Usage:
 *   node get_docs.mjs /docs/react/getting-started/theming
 *   node get_docs.mjs /docs/react/releases/v3-0-0-beta-3
 *
 * Output:
 *   MDX documentation content
 *
 * Note: For component docs, use get_component_docs.mjs instead.
 */

const API_BASE = process.env.HEROUI_API_BASE || "https://mcp-api.heroui.com";
const FALLBACK_BASE = "https://v3.heroui.com";
const APP_PARAM = "app=react-skills";

/**
 * Fetch documentation from HeroUI API.
 * Uses v1 endpoint pattern: /v1/docs/:path
 */
async function fetchApi(path) {
  // The v1 API expects path without /docs/ prefix
  // Input: /docs/react/getting-started/theming
  // API expects: react/getting-started/theming (route is /v1/docs/:path(*))
  let apiPath = path.startsWith("/docs/")
    ? path.slice(6) // Remove /docs/ prefix
    : path.startsWith("/")
      ? path.slice(1) // Remove leading /
      : path;

  const separator = "?";
  const url = `${API_BASE}/v1/docs/${apiPath}${separator}${APP_PARAM}`;

  try {
    const response = await fetch(url, {
      headers: {"User-Agent": "HeroUI-Skill/1.0"},
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      console.error(`# API Error: HTTP ${response.status}`);

      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`# API Error: ${error.message}`);

    return null;
  }
}

/**
 * Fetch MDX directly from v3.heroui.com as fallback.
 */
async function fetchFallback(path) {
  // Ensure path starts with /docs and ends with .mdx
  let cleanPath = path.replace(/^\//, "");

  if (!cleanPath.endsWith(".mdx")) {
    cleanPath = `${cleanPath}.mdx`;
  }

  const url = `${FALLBACK_BASE}/${cleanPath}`;

  try {
    const response = await fetch(url, {
      headers: {"User-Agent": "HeroUI-Skill/1.0"},
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      return {error: `HTTP ${response.status}: ${response.statusText}`, path};
    }

    const content = await response.text();

    return {
      content,
      contentType: "mdx",
      path,
      source: "fallback",
      url,
    };
  } catch (error) {
    return {error: `Fetch Error: ${error.message}`, path};
  }
}

/**
 * Main function to get documentation for specified path.
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error("Usage: node get_docs.mjs <path>");
    console.error("Example: node get_docs.mjs /docs/react/getting-started/theming");
    console.error();
    console.error("Available paths include:");
    console.error("  /docs/react/getting-started/theming");
    console.error("  /docs/react/getting-started/colors");
    console.error("  /docs/react/getting-started/animations");
    console.error("  /docs/react/releases/v3-0-0-beta-3");
    console.error();
    console.error("Note: For component docs, use get_component_docs.mjs instead.");
    process.exit(1);
  }

  const path = args[0];

  // Check if user is trying to get component docs
  if (path.includes("/components/")) {
    console.error("# Warning: Use get_component_docs.mjs for component documentation.");
    const componentName = path.split("/").pop().replace(".mdx", "");
    const titleCase = componentName.charAt(0).toUpperCase() + componentName.slice(1);

    console.error(`# Example: node get_component_docs.mjs ${titleCase}`);
  }

  console.error(`# Fetching documentation for ${path}...`);

  // Try API first
  const data = await fetchApi(path);

  if (data && data.content) {
    data.source = "api";
    console.log(data.content);

    return;
  }

  // Fallback to direct fetch
  console.error("# API failed, using fallback...");
  const fallbackData = await fetchFallback(path);

  if (fallbackData.content) {
    console.log(fallbackData.content);
  } else {
    console.log(JSON.stringify(fallbackData, null, 2));
    process.exit(1);
  }
}

main();
