import type {NextRequest} from "next/server";

import {appendFileSync} from "node:fs";

import {notFound} from "next/navigation";
import {NextResponse} from "next/server";

import {getLLMText} from "@/lib/get-llm-text";
import {i18n} from "@/lib/i18n";
import {LLMS_TEXT_HEADERS} from "@/lib/llms-utils";
import {source} from "@/lib/source";

export const dynamic = "force-static";
export const revalidate = false;

const SUPPORTED_LANGS = new Set<string>(i18n.languages);

function extractLangFromSlug(slug: string[]): {slug: string[]; lang?: string} {
  const first = slug[0];

  if (first !== undefined && SUPPORTED_LANGS.has(first)) {
    return {lang: first, slug: slug.slice(1)};
  }

  return {slug};
}

export async function GET(_req: NextRequest, {params}: {params: Promise<{slug: string[]}>}) {
  const routeParams = await params;

  // #region agent log
  appendFileSync(
    "/opt/cursor/logs/debug.log",
    `${JSON.stringify({
      data: {routeSlug: routeParams.slug},
      hypothesisId: "C,D",
      location: "apps/docs/src/app/llms.mdx/[...slug]/route.ts:GET-entry",
      message: "MDX route handler entered",
      timestamp: Date.now(),
    })}\n`,
  );
  // #endregion

  const {lang, slug} = extractLangFromSlug(routeParams.slug);
  const page = source.getPage(slug, lang);

  if (!page) notFound();

  try {
    const content = await getLLMText(page);

    // #region agent log
    appendFileSync(
      "/opt/cursor/logs/debug.log",
      `${JSON.stringify({
        data: {contentLength: content.length, lang: lang ?? null, slug},
        hypothesisId: "D,E",
        location: "apps/docs/src/app/llms.mdx/[...slug]/route.ts:GET-exit",
        message: "Generated MDX response",
        timestamp: Date.now(),
      })}\n`,
    );
    // #endregion

    return new NextResponse(content, {
      headers: LLMS_TEXT_HEADERS,
    });
  } catch (error) {
    console.error("Error generating llms.mdx:", error);

    return new NextResponse("Error generating documentation", {
      headers: LLMS_TEXT_HEADERS,
      status: 500,
    });
  }
}
