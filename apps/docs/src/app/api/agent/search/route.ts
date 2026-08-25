import type {NextRequest} from "next/server";

import {parseAgentLimit, parseAgentSearchPlatform, searchAgentDocs} from "@/lib/agent-api";
import {agentErrorResponse, jsonResponse} from "@/lib/agent-discovery";

export const dynamic = "force-dynamic";
export const revalidate = false;

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (!query) {
    return agentErrorResponse({
      code: "MISSING_QUERY",
      hint: "Add a non-empty q query parameter, for example ?q=button.",
      message: "The q query parameter is required.",
      status: 400,
    });
  }

  const platformParam = request.nextUrl.searchParams.get("platform");

  if (platformParam && !["all", "react", "native"].includes(platformParam)) {
    return agentErrorResponse({
      code: "INVALID_PLATFORM",
      hint: "Use one of: all, react, native.",
      message: `Unsupported platform: ${platformParam}.`,
      status: 400,
    });
  }

  const limitParam = request.nextUrl.searchParams.get("limit");
  const numericLimit = limitParam === null ? null : Number(limitParam);

  if (
    numericLimit !== null &&
    (!Number.isInteger(numericLimit) || numericLimit < 1 || numericLimit > 20)
  ) {
    return agentErrorResponse({
      code: "INVALID_LIMIT",
      hint: "Use an integer from 1 through 20.",
      message: `Invalid result limit: ${limitParam}.`,
      status: 400,
    });
  }

  const platform = parseAgentSearchPlatform(platformParam);
  const limit = parseAgentLimit(limitParam);
  const results = searchAgentDocs(query, platform, limit);

  return jsonResponse({
    count: results.length,
    platform,
    query,
    results,
  });
}
