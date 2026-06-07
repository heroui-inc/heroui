import type {Platform} from "@/lib/llms-utils";
import type {NextRequest} from "next/server";

import {siteConfig} from "@/config/site";
import {getLLMText} from "@/lib/get-llm-text";
import {
  LLMS_TEXT_HEADERS,
  filterExcludedPages,
  filterPagesByPlatform,
  filterPagesByType,
  generatePlatformIndexHeader,
} from "@/lib/llms-utils";
import {source} from "@/lib/source";

function formatAbsoluteUrl(path: string): string {
  if (!path) return "";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const baseUrl = siteConfig.siteUrl.toString().replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${baseUrl}${cleanPath}`;
}

export async function getPlatformLlmsTxt(platform: Platform) {
  try {
    const scanned = generatePlatformIndexHeader(platform);

    const pages = filterExcludedPages(source.getPages());
    const filteredPages = filterPagesByPlatform(pages, platform);

    if (filteredPages.length === 0) {
      return new Response(`No ${platform} documentation found`, {
        headers: LLMS_TEXT_HEADERS,
        status: 404,
      });
    }

    const map = new Map<string, string[]>();

    for (const page of filteredPages) {
      const category = page.slugs[1] ?? "general";
      const list = map.get(category) ?? [];
      const absoluteUrl = formatAbsoluteUrl(page.url);

      if (page.data.description) {
        list.push(`- [${page.data.title}](${absoluteUrl}): ${page.data.description}`);
      } else {
        list.push(`- [${page.data.title}](${absoluteUrl})`);
      }

      map.set(category, list);
    }

    const sortedCategories = Array.from(map.keys()).sort();

    for (const category of sortedCategories) {
      const pages = map.get(category);

      if (pages && pages.length > 0) {
        scanned.push(`### ${category.charAt(0).toUpperCase() + category.slice(1)}`);
        scanned.push("");
        scanned.push(pages.join("\n"));
        scanned.push("");
      }
    }

    return new Response(scanned.join("\n"), {
      headers: LLMS_TEXT_HEADERS,
    });
  } catch (error) {
    console.error(`Error generating ${platform}/llms.txt:`, error);

    return new Response("Error generating documentation index", {
      headers: LLMS_TEXT_HEADERS,
      status: 500,
    });
  }
}

export async function getPlatformLlmsComponentsTxt(platform: Platform) {
  try {
    const pages = filterExcludedPages(source.getPages());
    const platformPages = filterPagesByPlatform(pages, platform);
    const componentPages = filterPagesByType(platformPages, "components");

    if (componentPages.length === 0) {
      return new Response(`No ${platform} component documentation found`, {
        headers: LLMS_TEXT_HEADERS,
        status: 404,
      });
    }

    const scanned = await Promise.all(componentPages.map(getLLMText));

    return new Response(scanned.join("\n\n"), {
      headers: LLMS_TEXT_HEADERS,
    });
  } catch (error) {
    console.error(`Error generating ${platform}/llms-components.txt:`, error);

    return new Response("Error generating component documentation", {
      headers: LLMS_TEXT_HEADERS,
      status: 500,
    });
  }
}

export async function getPlatformLlmsFullTxt(platform: Platform) {
  try {
    const pages = filterExcludedPages(source.getPages());
    const filteredPages = filterPagesByPlatform(pages, platform);

    if (filteredPages.length === 0) {
      return new Response(`No ${platform} documentation found`, {
        headers: LLMS_TEXT_HEADERS,
        status: 404,
      });
    }

    const scanned = await Promise.all(filteredPages.map(getLLMText));

    return new Response(scanned.join("\n\n"), {
      headers: LLMS_TEXT_HEADERS,
    });
  } catch (error) {
    console.error(`Error generating ${platform}/llms-full.txt:`, error);

    return new Response("Error generating full documentation", {
      headers: LLMS_TEXT_HEADERS,
      status: 500,
    });
  }
}

export async function getPlatformLlmsPatternsTxt(platform: Platform) {
  try {
    const pages = filterExcludedPages(source.getPages());
    const platformPages = filterPagesByPlatform(pages, platform);
    const patternPages = filterPagesByType(platformPages, "patterns");

    if (patternPages.length === 0) {
      return new Response(`No ${platform} pattern documentation found`, {
        headers: LLMS_TEXT_HEADERS,
        status: 404,
      });
    }

    const scanned = await Promise.all(patternPages.map(getLLMText));

    return new Response(scanned.join("\n\n"), {
      headers: LLMS_TEXT_HEADERS,
    });
  } catch (error) {
    console.error(`Error generating ${platform}/llms-patterns.txt:`, error);

    return new Response("Error generating pattern documentation", {
      headers: LLMS_TEXT_HEADERS,
      status: 500,
    });
  }
}

export function createPlatformRouteHandler(
  platform: Platform,
  handler: (platform: Platform) => Promise<Response>,
) {
  return async function GET(_req: NextRequest) {
    return handler(platform);
  };
}
