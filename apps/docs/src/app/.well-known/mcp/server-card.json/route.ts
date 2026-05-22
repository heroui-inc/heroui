import {
  MCP_PACKAGE_VERSION,
  NATIVE_MCP_API_URL,
  REACT_MCP_API_URL,
  absoluteUrl,
  getRequestOrigin,
  jsonResponse,
} from "@/lib/agent-discovery";

export const dynamic = "force-dynamic";
export const revalidate = false;

export async function GET(request: Request) {
  const origin = getRequestOrigin(request);

  return jsonResponse({
    $schema: "https://modelcontextprotocol.io/schemas/server-card/draft.json",
    capabilities: {
      prompts: false,
      resources: false,
      tools: true,
    },
    description:
      "HeroUI MCP servers expose read-only HeroUI React and HeroUI Native documentation, component metadata, source references, styles, and theme variables to AI coding agents.",
    endpoint: absoluteUrl(origin, "/.well-known/mcp/server-card.json"),
    links: {
      docs: [
        absoluteUrl(origin, "/docs/react/getting-started/mcp-server"),
        absoluteUrl(origin, "/docs/native/getting-started/mcp-server"),
      ],
      npm: [
        "https://www.npmjs.com/package/@heroui/react-mcp",
        "https://www.npmjs.com/package/@heroui/native-mcp",
      ],
      source: "https://github.com/heroui-inc/heroui-mcp",
    },
    notes:
      "The supported MCP transport today is stdio through the published npm packages. The endpoint field identifies this server card for browser and catalog discovery; it is not a Streamable HTTP MCP endpoint.",
    serverInfo: {
      name: "HeroUI MCP",
      version: MCP_PACKAGE_VERSION,
    },
    tools: [
      {
        description: "List all available HeroUI v3 React components.",
        name: "list_components",
        package: "@heroui/react-mcp",
      },
      {
        description: "Get complete React component documentation.",
        name: "get_component_docs",
        package: "@heroui/react-mcp",
      },
      {
        description: "Get React component TypeScript source code.",
        name: "get_component_source_code",
        package: "@heroui/react-mcp",
      },
      {
        description: "Get React component CSS source styles.",
        name: "get_component_source_styles",
        package: "@heroui/react-mcp",
      },
      {
        description: "Get HeroUI React theme variables.",
        name: "get_theme_variables",
        package: "@heroui/react-mcp",
      },
      {
        description: "Browse full HeroUI React documentation.",
        name: "get_docs",
        package: "@heroui/react-mcp",
      },
      {
        description: "List all available HeroUI Native components.",
        name: "list_components",
        package: "@heroui/native-mcp",
      },
      {
        description: "Get complete Native component documentation.",
        name: "get_component_docs",
        package: "@heroui/native-mcp",
      },
      {
        description: "Get HeroUI Native theme variables.",
        name: "get_theme_variables",
        package: "@heroui/native-mcp",
      },
      {
        description: "Browse full HeroUI Native documentation.",
        name: "get_docs",
        package: "@heroui/native-mcp",
      },
    ],
    transports: [
      {
        args: ["-y", "@heroui/react-mcp@latest"],
        command: "npx",
        dataApi: REACT_MCP_API_URL,
        package: "@heroui/react-mcp",
        type: "stdio",
      },
      {
        args: ["-y", "@heroui/native-mcp@latest"],
        command: "npx",
        dataApi: NATIVE_MCP_API_URL,
        package: "@heroui/native-mcp",
        type: "stdio",
      },
    ],
  });
}
