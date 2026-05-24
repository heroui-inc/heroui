import {
  LINKSET_HEADERS,
  NATIVE_MCP_API_URL,
  REACT_MCP_API_URL,
  absoluteUrl,
  getAgentServiceBaseUrl,
  getRequestOrigin,
} from "@/lib/agent-discovery";

export const dynamic = "force-dynamic";
export const revalidate = false;

export async function GET(request: Request) {
  const origin = getRequestOrigin(request);
  const agentApi = getAgentServiceBaseUrl(origin);

  return new Response(
    JSON.stringify(
      {
        linkset: [
          {
            anchor: agentApi,
            "service-desc": [
              {
                href: absoluteUrl(origin, "/.well-known/openapi/heroui-agent-api.json"),
                type: "application/vnd.oai.openapi+json",
              },
            ],
            "service-doc": [
              {
                href: absoluteUrl(origin, "/docs/react/getting-started/llms-txt"),
                type: "text/html",
              },
              {
                href: absoluteUrl(origin, "/llms.txt"),
                type: "text/plain",
              },
            ],
            status: [
              {
                href: absoluteUrl(origin, "/api/agent/health"),
                type: "application/json",
              },
            ],
          },
          {
            anchor: REACT_MCP_API_URL,
            "service-desc": [
              {
                href: absoluteUrl(origin, "/.well-known/openapi/heroui-react-mcp-api.json"),
                type: "application/vnd.oai.openapi+json",
              },
            ],
            "service-doc": [
              {
                href: absoluteUrl(origin, "/docs/react/getting-started/mcp-server"),
                type: "text/html",
              },
            ],
            status: [
              {
                href: `${REACT_MCP_API_URL}/health`,
                type: "application/json",
              },
            ],
          },
          {
            anchor: NATIVE_MCP_API_URL,
            "service-desc": [
              {
                href: absoluteUrl(origin, "/.well-known/openapi/heroui-native-mcp-api.json"),
                type: "application/vnd.oai.openapi+json",
              },
            ],
            "service-doc": [
              {
                href: absoluteUrl(origin, "/docs/native/getting-started/mcp-server"),
                type: "text/html",
              },
            ],
            status: [
              {
                href: `${NATIVE_MCP_API_URL}/health`,
                type: "application/json",
              },
            ],
          },
        ],
      },
      null,
      2,
    ),
    {headers: LINKSET_HEADERS},
  );
}
