import {OPENAPI_HEADERS, absoluteUrl, getRequestOrigin} from "@/lib/agent-discovery";
import {agentApiDocument} from "@/lib/agent-openapi";

export const dynamic = "force-dynamic";
export const revalidate = false;

export function GET(request: Request) {
  const origin = getRequestOrigin(request);

  return new Response(JSON.stringify(agentApiDocument(origin), null, 2), {
    headers: {
      ...OPENAPI_HEADERS,
      Link: `<${absoluteUrl(origin, "/.well-known/openapi/heroui-agent-api.json")}>; rel="alternate"; type="application/vnd.oai.openapi+json"`,
    },
  });
}
