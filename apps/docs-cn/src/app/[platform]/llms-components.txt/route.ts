import type {NextRequest} from "next/server";

import {getLLMText} from "@/lib/get-llm-text";
import {
  LLMS_TEXT_HEADERS,
  filterExcludedPages,
  filterPagesByPlatform,
  filterPagesByType,
  validatePlatform,
} from "@/lib/llms-utils";
import {source} from "@/lib/source";

export const revalidate = false;

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

    const pages = filterExcludedPages(source.getPages());
    const platformPages = filterPagesByPlatform(pages, platform);
    const componentPages = filterPagesByType(platformPages, "components");

    if (componentPages.length === 0) {
      return new Response(`No ${platform} component documentation found`, {
        headers: LLMS_TEXT_HEADERS,
        status: 404,
      });
    }

    const scan = componentPages.map(getLLMText);
    const scanned = await Promise.all(scan);

    const content = scanned.join("\n\n");

    return new Response(content, {
      headers: LLMS_TEXT_HEADERS,
    });
  } catch (error) {
    const {platform: platformParam} = await params;

    console.error(`Error generating ${platformParam}/llms-components.txt:`, error);

    return new Response("Error generating component documentation", {
      headers: LLMS_TEXT_HEADERS,
      status: 500,
    });
  }
}
