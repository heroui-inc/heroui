import {getRequestOrigin, jsonResponse} from "@/lib/agent-discovery";
import {getMcpServerCard} from "@/lib/agent-mcp";

export const dynamic = "force-dynamic";
export const revalidate = false;

export function GET(request: Request) {
  return jsonResponse(getMcpServerCard(getRequestOrigin(request)), {
    headers: {
      Link: '</.well-known/mcp/server-card.json>; rel="service-desc"; type="application/json"',
    },
  });
}
