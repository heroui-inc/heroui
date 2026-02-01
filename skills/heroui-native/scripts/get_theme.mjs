#!/usr/bin/env node
/**
 * Get theme variables and design tokens for HeroUI Native.
 *
 * Usage:
 *   node get_theme.mjs
 *
 * Output:
 *   Theme variables organized by light/dark with HSL color format
 */

const API_BASE = process.env.HEROUI_NATIVE_API_BASE || "https://native-mcp-api.heroui.com";
const APP_PARAM = "app=native-skills";

// Fallback theme reference when API is unavailable
const FALLBACK_THEME = {
  borderRadius: {
    full: 9999,
    lg: 12,
    md: 8,
    sm: 6,
  },
  dark: {
    colors: [
      {
        category: "base",
        name: "--color-background",
        value: "hsl(0, 0%, 14.5%)",
      },
      {
        category: "semantic",
        name: "--color-foreground",
        value: "hsl(0, 0%, 98.4%)",
      },
      {
        category: "semantic",
        name: "--color-accent",
        value: "hsl(264.1, 100%, 55.1%)",
      },
      {
        category: "status",
        name: "--color-danger",
        value: "hsl(25.3, 100%, 63.7%)",
      },
      {
        category: "status",
        name: "--color-success",
        value: "hsl(163.2, 100%, 76.5%)",
      },
      {
        category: "status",
        name: "--color-warning",
        value: "hsl(86.0, 100%, 79.5%)",
      },
    ],
  },
  latestVersion: "beta",
  light: {
    colors: [
      {
        category: "base",
        name: "--color-background",
        value: "hsl(0, 0%, 100%)",
      },
      {
        category: "semantic",
        name: "--color-foreground",
        value: "hsl(285.89, 5.9%, 21.03%)",
      },
      {
        category: "semantic",
        name: "--color-accent",
        value: "hsl(253.83, 100%, 62.04%)",
      },
      {
        category: "status",
        name: "--color-danger",
        value: "hsl(25.74, 100%, 65.32%)",
      },
      {
        category: "status",
        name: "--color-success",
        value: "hsl(150.81, 100%, 73.29%)",
      },
      {
        category: "status",
        name: "--color-warning",
        value: "hsl(72.33, 100%, 78.19%)",
      },
    ],
  },
  note: "This is a fallback. For complete theme variables, ensure the API is accessible.",
  opacity: {
    disabled: 0.4,
    hover: 0.8,
    pressed: 0.6,
  },
  source: "fallback",
  theme: "default",
};

/**
 * Fetch data from HeroUI Native API with app parameter for analytics.
 */
async function fetchApi(endpoint) {
  const separator = endpoint.includes("?") ? "&" : "?";
  const url = `${API_BASE}${endpoint}${separator}${APP_PARAM}`;

  try {
    const response = await fetch(url, {
      headers: {"User-Agent": "HeroUI-Native-Skill/1.0"},
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
 * Format colors grouped by category.
 */
function formatColors(colors) {
  const grouped = {};

  for (const color of colors) {
    const category = color.category || "semantic";

    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(color);
  }

  const lines = [];

  for (const [category, tokens] of Object.entries(grouped)) {
    lines.push(`  /* ${category.charAt(0).toUpperCase() + category.slice(1)} Colors */`);
    for (const token of tokens) {
      const name = token.name || "";
      const value = token.value || "";

      lines.push(`  ${name}: ${value};`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

/**
 * Main function to get theme variables.
 */
async function main() {
  console.error("# Fetching Native theme variables...");

  const rawData = await fetchApi("/v1/themes/variables?theme=default");

  let data;
  let version;

  if (!rawData) {
    console.error("# API failed, using fallback theme reference...");
    data = FALLBACK_THEME;
    version = FALLBACK_THEME.latestVersion || "unknown";
  } else {
    // Handle API response format
    data = rawData;
    version = rawData.latestVersion || "unknown";
  }

  // Output as formatted structure for readability
  console.log("/* HeroUI Native Theme Variables */");
  console.log(`/* Theme: ${data.theme || "default"} */`);
  console.log(`/* Version: ${version} */`);
  console.log();

  // Light mode colors
  if (data.light && data.light.colors) {
    console.log("/* Light Mode Colors */");
    console.log(formatColors(data.light.colors));
  }

  // Dark mode colors
  if (data.dark && data.dark.colors) {
    console.log("/* Dark Mode Colors */");
    console.log(formatColors(data.dark.colors));
  }

  // Border radius
  if (data.borderRadius) {
    console.log("/* Border Radius */");
    for (const [key, value] of Object.entries(data.borderRadius)) {
      console.log(`  --radius-${key}: ${value};`);
    }
    console.log();
  }

  // Opacity
  if (data.opacity) {
    console.log("/* Opacity */");
    for (const [key, value] of Object.entries(data.opacity)) {
      console.log(`  --opacity-${key}: ${value};`);
    }
    console.log();
  }

  // Also output raw JSON to stderr for programmatic use
  console.error("\n# Raw JSON output:");
  console.error(JSON.stringify(rawData || data, null, 2));
}

main();
