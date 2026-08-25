import {AGENT_API_VERSION, jsonResponse} from "@/lib/agent-discovery";

export const dynamic = "force-dynamic";
export const revalidate = false;

export function GET() {
  return jsonResponse({
    description: "Public, read-only HeroUI documentation API for coding agents.",
    endpoints: {
      health: "/api/agent/health",
      openapi: "/openapi.json",
      page: "/api/agent/page?url=/docs/react/components/button",
      search: "/api/agent/search?q=button&platform=react",
    },
    name: "HeroUI Docs Agent API",
    version: AGENT_API_VERSION,
  });
}
