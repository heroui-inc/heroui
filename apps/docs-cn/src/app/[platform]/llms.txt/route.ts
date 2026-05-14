import type {NextRequest} from "next/server";

import {siteConfig} from "@/config/site";
import {
  LLMS_TEXT_HEADERS,
  filterExcludedPages,
  filterPagesByPlatform,
  generatePlatformIndexHeader,
  validatePlatform,
} from "@/lib/llms-utils";
import {source} from "@/lib/source";

export const revalidate = false;

function formatAbsoluteUrl(path: string): string {
  if (!path) return "";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const baseUrl = siteConfig.siteUrl.toString().replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${baseUrl}${cleanPath}`;
}

export async function GET(_req: NextRequest, {params}: {params: Promise<{platform: string}>}) {
  try {
    const {platform: platformParam} = await params;
    const platform = validatePlatform(platformParam);

    if (platform === null) {
      return new Response("Invalid platform. Use 'react' or 'native'", {
        headers: LLMS_TEXT_HEADERS,
        status: 400,
      });
    }

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

    const content = scanned.join("\n");

    return new Response(content, {
      headers: LLMS_TEXT_HEADERS,
    });
  } catch (error) {
    const {platform: platformParam} = await params;

    console.error(`Error generating ${platformParam}/llms.txt:`, error);

    return new Response("Error generating documentation index", {
      headers: LLMS_TEXT_HEADERS,
      status: 500,
    });
  }
}
