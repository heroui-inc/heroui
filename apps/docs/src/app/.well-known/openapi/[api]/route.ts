import {
  AGENT_API_VERSION,
  NATIVE_MCP_API_URL,
  OPENAPI_HEADERS,
  REACT_MCP_API_URL,
  absoluteUrl,
  getAgentServiceBaseUrl,
  getRequestOrigin,
} from "@/lib/agent-discovery";

export const dynamic = "force-dynamic";
export const revalidate = false;

type OpenAPIDocument = Record<string, unknown>;

function baseDocument(
  title: string,
  version: string,
  serverUrl: string,
  description: string,
): OpenAPIDocument {
  return {
    info: {
      description,
      title,
      version,
    },
    openapi: "3.1.0",
    servers: [{url: serverUrl}],
  };
}

function agentApiDocument(origin: string): OpenAPIDocument {
  return {
    ...baseDocument(
      "HeroUI Docs Agent API",
      AGENT_API_VERSION,
      getAgentServiceBaseUrl(origin),
      "Read-only endpoints that help agents search HeroUI documentation and retrieve markdown page content.",
    ),
    paths: {
      "/health": {
        get: {
          operationId: "getAgentApiHealth",
          responses: {
            "200": {
              description: "Agent API health status",
            },
          },
          summary: "Check service health",
        },
      },
      "/page": {
        get: {
          operationId: "getHeroUIDocPageMarkdown",
          parameters: [
            {
              description: "HeroUI docs page URL, for example /docs/react/components/button",
              in: "query",
              name: "url",
              required: true,
              schema: {type: "string"},
            },
          ],
          responses: {
            "200": {description: "Documentation page metadata and markdown"},
            "404": {description: "Documentation page not found"},
          },
          summary: "Retrieve a documentation page as markdown",
        },
      },
      "/search": {
        get: {
          operationId: "searchHeroUIDocs",
          parameters: [
            {in: "query", name: "q", required: true, schema: {type: "string"}},
            {
              in: "query",
              name: "platform",
              schema: {default: "all", enum: ["all", "react", "native"], type: "string"},
            },
            {
              in: "query",
              name: "limit",
              schema: {default: 10, maximum: 20, minimum: 1, type: "integer"},
            },
          ],
          responses: {
            "200": {description: "Matching documentation pages"},
            "400": {description: "Invalid request"},
          },
          summary: "Search HeroUI documentation",
        },
      },
    },
  };
}

function mcpApiDocument(kind: "react" | "native"): OpenAPIDocument {
  const isReact = kind === "react";
  const serverUrl = isReact ? REACT_MCP_API_URL : NATIVE_MCP_API_URL;
  const title = isReact ? "HeroUI React MCP Data API" : "HeroUI Native MCP Data API";
  const componentSourcePaths = isReact
    ? {
        "/v1/components/source": {
          post: {
            operationId: "getComponentSource",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    properties: {components: {items: {type: "string"}, type: "array"}},
                    type: "object",
                  },
                },
              },
            },
            responses: {"200": {description: "Component source code"}},
            summary: "Get component TypeScript source",
          },
        },
        "/v1/components/styles": {
          post: {
            operationId: "getComponentStyles",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    properties: {components: {items: {type: "string"}, type: "array"}},
                    type: "object",
                  },
                },
              },
            },
            responses: {"200": {description: "Component CSS styles"}},
            summary: "Get component styles",
          },
        },
      }
    : {};

  return {
    ...baseDocument(
      title,
      "1.1.0",
      serverUrl,
      `Read-only data API used by the ${isReact ? "@heroui/react-mcp" : "@heroui/native-mcp"} package and HeroUI agent skills.`,
    ),
    paths: {
      "/health": {
        get: {
          operationId: "getHealth",
          responses: {"200": {description: "Health status"}},
          summary: "Check API health",
        },
      },
      "/v1/components": {
        get: {
          operationId: "listComponents",
          responses: {"200": {description: "Available components"}},
          summary: "List available components",
        },
      },
      "/v1/components/docs": {
        post: {
          operationId: "getComponentDocs",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  properties: {components: {items: {type: "string"}, type: "array"}},
                  type: "object",
                },
              },
            },
          },
          responses: {"200": {description: "Component documentation"}},
          summary: "Get component documentation",
        },
      },
      ...componentSourcePaths,
      "/v1/docs/{path}": {
        get: {
          operationId: "getDocs",
          parameters: [{in: "path", name: "path", required: true, schema: {type: "string"}}],
          responses: {"200": {description: "Documentation content"}},
          summary: "Get documentation by path",
        },
      },
      "/v1/themes/variables": {
        get: {
          operationId: "getThemeVariables",
          parameters: [{in: "query", name: "theme", schema: {default: "default", type: "string"}}],
          responses: {"200": {description: "Theme variables"}},
          summary: "Get theme variables",
        },
      },
    },
  };
}

const OPENAPI_BUILDERS: Record<string, (origin: string) => OpenAPIDocument> = {
  "heroui-agent-api.json": agentApiDocument,
  "heroui-native-mcp-api.json": () => mcpApiDocument("native"),
  "heroui-react-mcp-api.json": () => mcpApiDocument("react"),
};

export async function GET(request: Request, {params}: {params: Promise<{api: string}>}) {
  const {api} = await params;
  const builder = OPENAPI_BUILDERS[api];

  if (!builder) {
    return new Response(
      JSON.stringify(
        {available: Object.keys(OPENAPI_BUILDERS), error: "OpenAPI description not found"},
        null,
        2,
      ),
      {
        headers: {"Content-Type": "application/json; charset=utf-8"},
        status: 404,
      },
    );
  }

  const origin = getRequestOrigin(request);

  return new Response(JSON.stringify(builder(origin), null, 2), {
    headers: {
      ...OPENAPI_HEADERS,
      Link: `<${absoluteUrl(origin, "/.well-known/api-catalog")}>; rel="api-catalog"; type="application/linkset+json"`,
    },
  });
}
