import type {Page} from "@/lib/source";

import {siteConfig} from "@/config/site";

export type Platform = "react" | "native" | "all";

export type ContentType = "all" | "components" | "patterns";

export const LLMS_TEXT_HEADERS = {
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
  "Content-Type": "text/plain; charset=utf-8",
} as const;

export function getPlatformFromPage(page: Page): Platform {
  const firstSlug = page.slugs[0];

  if (firstSlug === "react") return "react";
  if (firstSlug === "native") return "native";

  return "all";
}

export function validatePlatform(platform: string | undefined): Platform | null {
  if (!platform) return "all";
  if (platform === "react" || platform === "native") return platform;

  return null;
}

export function filterPagesByPlatform(pages: Page[], platform: Platform): Page[] {
  if (platform === "all") return pages;

  return pages.filter((page) => {
    const pagePlatform = getPlatformFromPage(page);

    return pagePlatform === platform;
  });
}

export function isComponentPage(page: Page): boolean {
  return page.url.includes("/components/");
}

export function isPatternPage(page: Page): boolean {
  return page.url.includes("/getting-started/") || page.url.includes("/handbook/");
}

export function filterPagesByType(pages: Page[], type: ContentType): Page[] {
  if (type === "all") return pages;

  return pages.filter((page) => {
    if (type === "components") return isComponentPage(page);
    if (type === "patterns") return isPatternPage(page);

    return false;
  });
}

export function filterExcludedPages(pages: Page[]): Page[] {
  return pages.filter((page) => page.slugs[0] !== "openapi");
}

function formatAbsoluteUrl(path: string): string {
  if (!path) return "";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const baseUrl = siteConfig.siteUrl.toString().replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${baseUrl}${cleanPath}`;
}

export function generateIndexHeader(): string[] {
  const reactUrl = "/react/llms.txt";
  const nativeUrl = "/native/llms.txt";
  const reactAbsoluteUrl = formatAbsoluteUrl(reactUrl);
  const nativeAbsoluteUrl = formatAbsoluteUrl(nativeUrl);

  return [
    "# HeroUI v3 Documentation",
    "",
    "> A set of beautiful, customizable React and React Native components that stay maintained and up to date.",
    "",
    "HeroUI v3 is an open-source UI component library for building modern web and mobile applications. Built on [Tailwind CSS v4](https://tailwindcss.com/) and [React Aria Components](https://react-spectrum.adobe.com/react-aria/), HeroUI provides accessible, customizable components with smooth animations and polished details.",
    "",
    "**Key Features:**",
    "",
    "- Beautiful by default - Professional look out of the box, no extra styling needed",
    "- Accessible - Built with accessibility in mind, following WAI-ARIA guidelines",
    "- Flexible - Each component is made of customizable parts",
    "- Developer-friendly - Fully typed APIs, predictable patterns, and excellent autocompletion",
    "- Maintained - Regular updates, bug fixes, and new features",
    "",
    "**Technology Stack:**",
    "",
    "- React 19+ for web components",
    "- React Native for mobile components",
    "- Tailwind CSS v4 for styling",
    "- TypeScript for type safety",
    "",
    "## Available Platforms",
    "",
    `- **React (Web)**: [${reactUrl}](${reactAbsoluteUrl}) - React component library for web applications`,
    `- **React Native**: [${nativeUrl}](${nativeAbsoluteUrl}) - React Native component library for mobile applications`,
    "",
    "## Documentation Index",
    "",
  ];
}

export function generatePlatformIndexHeader(platform: Platform): string[] {
  const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);
  const isReact = platform === "react";
  const techStack = isReact
    ? "[Tailwind CSS v4](https://tailwindcss.com/) and [React Aria Components](https://react-spectrum.adobe.com/react-aria/)"
    : "[Tailwind v4](https://tailwindcss.com/) via [Uniwind](https://uniwind.dev/) and modern mobile development technologies";

  return [
    `# HeroUI v3 ${platformName} Documentation`,
    "",
    `> Documentation for HeroUI ${platformName} component library.`,
    "",
    `HeroUI ${platformName} is a component library built on ${techStack}. Every component comes with smooth animations, polished details, and built-in accessibility—ready to use, fully customizable.`,
    "",
    "**Key Features:**",
    "",
    "- Beautiful by default - Professional look out of the box",
    "- Accessible - Built with accessibility best practices",
    "- Flexible - Customizable components with predictable patterns",
    "- Developer-friendly - Fully typed APIs and excellent autocompletion",
    "",
    "## Documentation Index",
    "",
  ];
}
