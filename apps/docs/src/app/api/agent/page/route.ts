import type {NextRequest} from "next/server";

import {getAgentDocPage} from "@/lib/agent-api";
import {agentErrorResponse, jsonResponse} from "@/lib/agent-discovery";

export const dynamic = "force-dynamic";
export const revalidate = false;

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url") ?? request.nextUrl.searchParams.get("path");
  const localeParam = request.nextUrl.searchParams.get("locale");

  if (localeParam && !["en", "cn"].includes(localeParam)) {
    return agentErrorResponse({
      code: "INVALID_LOCALE",
      hint: "Use one of: en, cn.",
      message: `Unsupported locale: ${localeParam}.`,
      status: 400,
    });
  }

  if (!url) {
    return agentErrorResponse({
      code: "MISSING_PAGE_URL",
      hint: "Add a HeroUI docs path, for example ?url=/docs/react/components/button.",
      message: "The url query parameter is required.",
      status: 400,
    });
  }

  const page = await getAgentDocPage(url, localeParam === "cn" ? "cn" : "en");

  if (!page) {
    return agentErrorResponse({
      code: "PAGE_NOT_FOUND",
      hint: "Use /api/agent/search to find a canonical HeroUI documentation URL.",
      message: `No HeroUI documentation page was found for ${url}.`,
      status: 404,
    });
  }

  return jsonResponse(page);
}
