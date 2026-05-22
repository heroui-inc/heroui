export const AGENT_DISCOVERY_CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
} as const;

export const JSON_HEADERS = {
  ...AGENT_DISCOVERY_CACHE_HEADERS,
  "Content-Type": "application/json; charset=utf-8",
} as const;

export const LINKSET_HEADERS = {
  ...AGENT_DISCOVERY_CACHE_HEADERS,
  "Content-Type": "application/linkset+json; charset=utf-8",
} as const;

export const MARKDOWN_HEADERS = {
  ...AGENT_DISCOVERY_CACHE_HEADERS,
  "Content-Type": "text/markdown; charset=utf-8",
} as const;

export const OPENAPI_HEADERS = {
  ...AGENT_DISCOVERY_CACHE_HEADERS,
  "Content-Type": "application/vnd.oai.openapi+json; charset=utf-8",
} as const;

export const AGENT_API_VERSION = "3.0.5";
export const MCP_PACKAGE_VERSION = "1.1.0";

export const REACT_MCP_API_URL = "https://mcp-api.heroui.com";
export const NATIVE_MCP_API_URL = "https://native-mcp-api.heroui.com";

export const AGENT_SKILL_DESCRIPTIONS: Record<string, string> = {
  "heroui-migration":
    "Migrate projects from HeroUI v2 and NextUI patterns to HeroUI v3 with current guides and examples.",
  "heroui-native":
    "Build React Native applications with HeroUI Native components, theme variables, and documentation lookup.",
  "heroui-react":
    "Build React applications with HeroUI v3 components, theming, styling, and documentation lookup.",
};

export function normalizeOrigin(origin: string): string {
  return origin.replace(/\/$/, "");
}

export function getRequestOrigin(request: Request): string {
  const headers = request.headers;
  const forwardedHost = headers.get("x-forwarded-host");
  const host = forwardedHost ?? headers.get("host");

  if (host) {
    const forwardedProto = headers.get("x-forwarded-proto");
    const protocol = forwardedProto ?? (host.includes("localhost") ? "http" : "https");

    return normalizeOrigin(`${protocol}://${host}`);
  }

  return normalizeOrigin(new URL(request.url).origin);
}

export function absoluteUrl(origin: string, path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${normalizeOrigin(origin)}${cleanPath}`;
}

export function getHomepageLinkHeader(): string {
  return [
    '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
    '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
    '</.well-known/mcp/server-card.json>; rel="service-desc"; type="application/json"',
    '</.well-known/oauth-protected-resource>; rel="oauth-protected-resource"; type="application/json"',
    '</llms.txt>; rel="service-doc"; type="text/plain"',
    '</llms-full.txt>; rel="describedby"; type="text/plain"',
  ].join(", ");
}

export function jsonResponse(data: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(data, null, 2), {
    ...init,
    headers: {
      ...JSON_HEADERS,
      ...init.headers,
    },
  });
}

export function getAgentServiceBaseUrl(origin: string): string {
  return absoluteUrl(origin, "/api/agent");
}
