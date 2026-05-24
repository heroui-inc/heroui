import {absoluteUrl, getRequestOrigin, jsonResponse} from "@/lib/agent-discovery";

export const dynamic = "force-dynamic";
export const revalidate = false;

export async function GET(request: Request) {
  const origin = getRequestOrigin(request);

  return jsonResponse({
    authorization_servers: [origin],
    heroui_public_api_authentication:
      "HeroUI public documentation and MCP data APIs are currently unauthenticated and read-only. This metadata exists so agents can discover that no OAuth scopes are required for public resources.",
    resource: origin,
    resource_documentation: absoluteUrl(origin, "/.well-known/api-catalog"),
    scopes_supported: [],
  });
}
