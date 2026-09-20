import type {ClientTool, ClientToolExecutionContext} from "@heroui/agent";

type DocsToolInput = Record<string, unknown>;

export type DocsAgentContext = {
  navigate: (url: string) => void;
  page: () => DocsPageContext;
};

export type DocsPageContext = {
  locale: "en";
  page: {
    description: string;
    heading: string;
    title: string;
  };
  platform: "native" | "react" | null;
  route: {
    hash: string;
    pathname: string;
    query: Record<string, string>;
  };
};

type DocsToolDefinition = Omit<ClientTool<DocsToolInput, DocsAgentContext>, "execute"> & {
  execute: (
    input: DocsToolInput,
    context?: DocsAgentContext,
    execution?: ClientToolExecutionContext,
  ) => Promise<unknown> | unknown;
};

const DEFAULT_PAGE_CHARACTERS = 40_000;
const MAX_PAGE_CHARACTERS = 40_000;

function getString(input: DocsToolInput, key: string, fallback = ""): string {
  const value = input[key];

  return typeof value === "string" ? value : fallback;
}

function getInteger(input: DocsToolInput, key: string, fallback: number): number {
  const value = input[key];
  const parsed = typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(parsed)) return fallback;

  return Math.trunc(parsed);
}

function getPlatform(input: DocsToolInput, fallback: "all" | "native" | "react" = "all") {
  const platform = getString(input, "platform", fallback);

  if (platform === "react" || platform === "native" || platform === "all") return platform;

  return fallback;
}

async function fetchJson(path: string, signal?: AbortSignal): Promise<unknown> {
  const response = await fetch(path, {
    headers: {
      Accept: "application/json",
    },
    signal,
  });
  const data: unknown = await response.json();

  if (!response.ok) {
    const message =
      typeof data === "object" && data !== null && "error" in data && typeof data.error === "string"
        ? data.error
        : "HeroUI docs request failed";

    throw new Error(message);
  }

  return data;
}

export function resolveSameOriginPath(value: string, origin: string): string | null {
  try {
    const url = new URL(value, origin);

    if (url.origin !== origin) return null;
    if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/_next/")) return null;

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return null;
  }
}

export function sliceMarkdownResult(
  value: unknown,
  start = 0,
  maxCharacters = DEFAULT_PAGE_CHARACTERS,
): unknown {
  if (
    typeof value !== "object" ||
    value === null ||
    !("markdown" in value) ||
    typeof value.markdown !== "string"
  ) {
    return value;
  }

  const safeStart = Math.min(Math.max(Math.trunc(start), 0), value.markdown.length);
  const safeMaximum = Math.min(Math.max(Math.trunc(maxCharacters), 1_000), MAX_PAGE_CHARACTERS);
  const end = Math.min(safeStart + safeMaximum, value.markdown.length);

  return {
    ...value,
    markdown: value.markdown.slice(safeStart, end),
    range: {
      end,
      start: safeStart,
      totalCharacters: value.markdown.length,
    },
    truncated: end < value.markdown.length,
  };
}

export function createDocsPageContext({
  description,
  hash,
  heading,
  href,
  title,
}: {
  description: string;
  hash: string;
  heading: string;
  href: string;
  title: string;
}): DocsPageContext {
  const url = new URL(href);
  const segments = url.pathname.split("/").filter(Boolean);
  const platformSegment = segments.find((segment) => segment === "native" || segment === "react");
  const query = Object.fromEntries(
    Array.from(url.searchParams.entries())
      .slice(0, 10)
      .map(([key, value]) => [key.slice(0, 100), value.slice(0, 200)]),
  );

  return {
    locale: "en",
    page: {
      description: description.trim().slice(0, 500),
      heading: heading.trim().slice(0, 200),
      title: title.trim().slice(0, 200),
    },
    platform: platformSegment ?? null,
    route: {
      hash: hash.slice(0, 200),
      pathname: url.pathname,
      query,
    },
  };
}

export function getDocsPageContext(): DocsPageContext {
  return createDocsPageContext({
    description: document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content ?? "",
    hash: window.location.hash,
    heading: document.querySelector("h1")?.textContent ?? "",
    href: window.location.href,
    title: document.title,
  });
}

export const docsToolDefinitions: DocsToolDefinition[] = [
  {
    description:
      "Search the official HeroUI React and Native documentation by keyword. Returns at most 20 concise page matches.",
    displayName: "Search HeroUI docs",
    execute(input, _context, execution) {
      const query = getString(input, "query").trim();
      const platform = getPlatform(input);
      const limit = Math.min(Math.max(getInteger(input, "limit", 10), 1), 20);

      if (!query) throw new Error("query is required");

      return fetchJson(
        `/api/agent/search?q=${encodeURIComponent(query)}&platform=${platform}&limit=${limit}&locale=en`,
        execution?.signal,
      );
    },
    icon: "search",
    name: "search_heroui_docs",
    parameters: {
      additionalProperties: false,
      properties: {
        limit: {default: 10, maximum: 20, minimum: 1, type: "integer"},
        platform: {default: "all", enum: ["all", "react", "native"], type: "string"},
        query: {
          description: "Search query, such as button, theming, migration, or native colors.",
          type: "string",
        },
      },
      required: ["query"],
      type: "object",
    },
  },
  {
    description:
      "Retrieve one official HeroUI documentation page as markdown from a same-origin /docs/ path.",
    displayName: "Read HeroUI doc",
    async execute(input, _context, execution) {
      const url = resolveSameOriginPath(getString(input, "url"), window.location.origin);
      const pathname = url ? new URL(url, window.location.origin).pathname : null;
      const unlocalizedUrl = pathname?.replace(/^\/en(?=\/docs(?:\/|$))/, "");
      const start = Math.max(getInteger(input, "start", 0), 0);
      const maxCharacters = Math.min(
        Math.max(getInteger(input, "maxCharacters", DEFAULT_PAGE_CHARACTERS), 1_000),
        MAX_PAGE_CHARACTERS,
      );

      if (!unlocalizedUrl?.startsWith("/docs/")) {
        throw new Error("url must be a same-origin HeroUI docs path");
      }

      const result = await fetchJson(
        `/api/agent/page?url=${encodeURIComponent(unlocalizedUrl)}&locale=en`,
        execution?.signal,
      );

      return sliceMarkdownResult(result, start, maxCharacters);
    },
    icon: "view",
    name: "get_heroui_doc",
    parameters: {
      additionalProperties: false,
      properties: {
        maxCharacters: {
          default: DEFAULT_PAGE_CHARACTERS,
          maximum: MAX_PAGE_CHARACTERS,
          minimum: 1_000,
          type: "integer",
        },
        start: {default: 0, minimum: 0, type: "integer"},
        url: {
          description:
            "A HeroUI docs path, for example /en/docs/react/components/button or /docs/react/components/button.",
          type: "string",
        },
      },
      required: ["url"],
      type: "object",
    },
  },
  {
    description:
      "Navigate the current browser tab to a same-origin HeroUI page. Use only when the user asks to open or go to a page.",
    displayName: "Open HeroUI page",
    execute(input, context) {
      const url = resolveSameOriginPath(getString(input, "url"), window.location.origin);

      if (!url) throw new Error("url must be a same-origin HeroUI page");

      if (context) context.navigate(url);
      else window.location.assign(url);

      return {navigating: true, url};
    },
    icon: "navigate",
    name: "navigate_heroui",
    needsApproval: true,
    parameters: {
      additionalProperties: false,
      properties: {
        url: {
          description: "A same-origin HeroUI path, for example /en/docs/react/getting-started.",
          type: "string",
        },
      },
      required: ["url"],
      type: "object",
    },
  },
  {
    description:
      "List official HeroUI component documentation pages for React or Native. Returns at most 20 entries.",
    displayName: "List HeroUI components",
    execute(input, _context, execution) {
      const platform = getPlatform(input, "react") === "native" ? "native" : "react";
      const limit = Math.min(Math.max(getInteger(input, "limit", 20), 1), 20);

      return fetchJson(
        `/api/agent/search?q=${encodeURIComponent("/components/")}&platform=${platform}&limit=${limit}&locale=en`,
        execution?.signal,
      );
    },
    icon: "view",
    name: "list_heroui_components",
    parameters: {
      additionalProperties: false,
      properties: {
        limit: {default: 20, maximum: 20, minimum: 1, type: "integer"},
        platform: {default: "react", enum: ["react", "native"], type: "string"},
      },
      type: "object",
    },
  },
];

export const docsAgentTools: ClientTool<DocsToolInput, DocsAgentContext>[] =
  docsToolDefinitions.map((definition) => ({
    ...definition,
    execute: (input, context, execution) => definition.execute(input, context, execution),
  }));
