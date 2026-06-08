import type {NextRequest} from "next/server";

import {notFound} from "next/navigation";
import {NextResponse} from "next/server";

import {getLLMText} from "@/lib/get-llm-text";
import {i18n} from "@/lib/i18n";
import {LLMS_TEXT_HEADERS} from "@/lib/llms-utils";
import {source} from "@/lib/source";

export const revalidate = false;

const SUPPORTED_LANGS = new Set<string>(i18n.languages);

function extractLangFromSlug(slug: string[]): {slug: string[]; lang?: string} {
  const first = slug[0];

  if (first !== undefined && SUPPORTED_LANGS.has(first)) {
    return {lang: first, slug: slug.slice(1)};
  }

  return {slug};
}

// Render on demand at request time. Prerendering every doc page here
// causes OpenNext to inline the full prerender-manifest (every page's
// MDX body) into the Worker's handler.mjs, which pushes the compressed
// Worker bundle past Cloudflare's per-script size limit (10 MiB on the
// Workers Paid plan). Dynamic rendering keeps the bundle small while
// still serving the same content from `source` on the Worker runtime.
export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, {params}: {params: Promise<{slug: string[]}>}) {
  try {
    const {lang, slug} = extractLangFromSlug((await params).slug);
    const page = source.getPage(slug, lang);

    if (!page) notFound();

    const content = await getLLMText(page);

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
