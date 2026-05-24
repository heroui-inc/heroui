import type {NextRequest} from "next/server";

import {MARKDOWN_HEADERS, getHomepageLinkHeader, getRequestOrigin} from "@/lib/agent-discovery";
import {
  estimateMarkdownTokens,
  getHomepageMarkdown,
  resolveDocsPathToSlug,
} from "@/lib/agent-markdown";
import {getLLMText} from "@/lib/get-llm-text";
import {source} from "@/lib/source";

export const dynamic = "force-dynamic";
export const revalidate = false;

function markdownResponse(markdown: string, init: ResponseInit = {}): Response {
  return new Response(markdown, {
    ...init,
    headers: {
      ...MARKDOWN_HEADERS,
      "x-markdown-tokens": String(estimateMarkdownTokens(markdown)),
      ...init.headers,
    },
  });
}

async function getMarkdownForPath(request: NextRequest): Promise<Response> {
  const origin = getRequestOrigin(request);
  const pathname =
    request.headers.get("x-heroui-markdown-path") ??
    request.nextUrl.searchParams.get("path") ??
    "/";

  if (pathname === "/") {
    return markdownResponse(getHomepageMarkdown(origin), {
      headers: {
        Link: getHomepageLinkHeader(),
      },
    });
  }

  const slug = resolveDocsPathToSlug(pathname);

  if (!slug) {
    return markdownResponse(
      `# Not Found\n\nNo markdown representation is available for ${pathname}.\n`,
      {
        status: 404,
      },
    );
  }

  const page = source.getPage(slug);

  if (!page) {
    return markdownResponse(`# Not Found\n\nNo documentation page was found for ${pathname}.\n`, {
      status: 404,
    });
  }

  return markdownResponse(await getLLMText(page));
}

export async function GET(request: NextRequest) {
  return getMarkdownForPath(request);
}

export async function HEAD(request: NextRequest) {
  const response = await getMarkdownForPath(request);

  return new Response(null, {
    headers: response.headers,
    status: response.status,
  });
}
