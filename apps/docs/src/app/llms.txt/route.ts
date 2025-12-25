import {siteConfig} from "@/config/site";
import {LLMS_TEXT_HEADERS, filterExcludedPages, generateIndexHeader} from "@/lib/llms-utils";
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

export async function GET() {
  try {
    const scanned = generateIndexHeader();

    const pages = filterExcludedPages(source.getPages());
    const map = new Map<string, string[]>();

    for (const page of pages) {
      const dir = page.slugs[0] ?? "";
      const list = map.get(dir) ?? [];
      const absoluteUrl = formatAbsoluteUrl(page.url);

      if (page.data.description) {
        list.push(`- [${page.data.title}](${absoluteUrl}): ${page.data.description}`);
      } else {
        list.push(`- [${page.data.title}](${absoluteUrl})`);
      }

      map.set(dir, list);
    }

    const platformOrder = ["react", "native"];

    for (const platform of platformOrder) {
      const pages = map.get(platform);

      if (pages && pages.length > 0) {
        scanned.push(`### ${platform.charAt(0).toUpperCase() + platform.slice(1)}`);
        scanned.push("");
        scanned.push(pages.join("\n"));
        scanned.push("");
      }
    }

    const otherKeys = Array.from(map.keys()).filter((key) => !platformOrder.includes(key));

    if (otherKeys.length > 0) {
      for (const key of otherKeys) {
        const value = map.get(key);

        if (value) {
          scanned.push(`### ${key}`);
          scanned.push("");
          scanned.push(value.join("\n"));
          scanned.push("");
        }
      }
    }

    const content = scanned.join("\n");

    return new Response(content, {
      headers: LLMS_TEXT_HEADERS,
    });
  } catch (error) {
    console.error("Error generating llms.txt:", error);

    return new Response("Error generating documentation index", {
      headers: LLMS_TEXT_HEADERS,
      status: 500,
    });
  }
}
