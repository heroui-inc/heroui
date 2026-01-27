#!/usr/bin/env node
/**
 * Get React/TypeScript source code implementation for HeroUI v3 components.
 *
 * Usage:
 *   node get_source.mjs Button
 *   node get_source.mjs Button Accordion Card
 *
 * Output:
 *   Full TSX source code with GitHub URL for each component
 */

const API_BASE = process.env.HEROUI_API_BASE || "https://mcp-api.heroui.com";
const GITHUB_RAW_BASE = "https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3";
const APP_PARAM = "app=react-skills";

/**
 * Fetch data from HeroUI API with app parameter for analytics.
 */
async function fetchApi(endpoint, method = "GET", body = null) {
  const separator = endpoint.includes("?") ? "&" : "?";
  const url = `${API_BASE}${endpoint}${separator}${APP_PARAM}`;

  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "HeroUI-Skill/1.0",
      },
      method,
      signal: AbortSignal.timeout(30000),
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

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
 * Fetch source code directly from GitHub as fallback.
 */
async function fetchGithubFallback(component) {
  // Try common patterns for component paths
  const patterns = [
    `packages/react/src/components/${component.toLowerCase()}/${component.toLowerCase()}.tsx`,
    `packages/react/src/components/${component.toLowerCase()}/index.tsx`,
  ];

  for (const path of patterns) {
    const url = `${GITHUB_RAW_BASE}/${path}`;

    try {
      const response = await fetch(url, {
        headers: {"User-Agent": "HeroUI-Skill/1.0"},
        signal: AbortSignal.timeout(30000),
      });

      if (response.ok) {
        const content = await response.text();

        return {
          component,
          filePath: path,
          githubUrl: `https://github.com/heroui-inc/heroui/blob/v3/${path}`,
          source: "fallback",
          sourceCode: content,
        };
      }
    } catch {
      continue;
    }
  }

  return {component, error: `Failed to fetch source for ${component}`};
}

/**
 * Main function to get source code for specified components.
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error("Usage: node get_source.mjs <Component1> [Component2] ...");
    console.error("Example: node get_source.mjs Button Accordion");
    process.exit(1);
  }

  const components = args;

  // Try API first
  console.error(`# Fetching source code for: ${components.join(", ")}...`);
  const data = await fetchApi("/v1/components/source", "POST", {components});

  if (data && data.results) {
    for (const result of data.results) {
      result.source = "api";
    }

    // Output results
    if (data.results.length === 1) {
      const result = data.results[0];

      if (result.sourceCode) {
        console.log(`// File: ${result.filePath || "unknown"}`);
        console.log(`// GitHub: ${result.githubUrl || "unknown"}`);
        console.log();
        console.log(result.sourceCode);
      } else {
        console.log(JSON.stringify(result, null, 2));
      }
    } else {
      console.log(JSON.stringify(data, null, 2));
    }

    return;
  }

  // Fallback to GitHub direct fetch
  console.error("# API failed, using GitHub fallback...");
  const results = [];

  for (const component of components) {
    const result = await fetchGithubFallback(component);

    results.push(result);
  }

  if (results.length === 1) {
    const result = results[0];

    if (result.sourceCode) {
      console.log(`// File: ${result.filePath || "unknown"}`);
      console.log(`// GitHub: ${result.githubUrl || "unknown"}`);
      console.log();
      console.log(result.sourceCode);
    } else {
      console.log(JSON.stringify(result, null, 2));
    }
  } else {
    console.log(JSON.stringify({results}, null, 2));
  }
}

main();
