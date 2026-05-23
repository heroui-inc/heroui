import type {NextRequest} from "next/server";

import {parseAgentLimit, parseAgentSearchPlatform, searchAgentDocs} from "@/lib/agent-api";
import {jsonResponse} from "@/lib/agent-discovery";

export const dynamic = "force-dynamic";
export const revalidate = false;

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (!query) {
    return jsonResponse({error: "Missing required query parameter: q"}, {status: 400});
  }

  const platform = parseAgentSearchPlatform(request.nextUrl.searchParams.get("platform"));
  const limit = parseAgentLimit(request.nextUrl.searchParams.get("limit"));
  const results = searchAgentDocs(query, platform, limit);

  return jsonResponse({
    count: results.length,
    platform,
    query,
    results,
  });
}
