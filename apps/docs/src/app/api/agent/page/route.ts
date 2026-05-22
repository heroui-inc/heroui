import type {NextRequest} from "next/server";

import {getAgentDocPage} from "@/lib/agent-api";
import {jsonResponse} from "@/lib/agent-discovery";

export const dynamic = "force-dynamic";
export const revalidate = false;

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url") ?? request.nextUrl.searchParams.get("path");

  if (!url) {
    return jsonResponse({error: "Missing required query parameter: url"}, {status: 400});
  }

  const page = await getAgentDocPage(url);

  if (!page) {
    return jsonResponse({error: "Documentation page not found", url}, {status: 404});
  }

  return jsonResponse(page);
}
