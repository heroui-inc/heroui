import type {NextRequest} from "next/server";

import {notFound} from "next/navigation";
import {NextResponse} from "next/server";

import {getLLMText} from "@/lib/get-llm-text";
import {LLMS_TEXT_HEADERS} from "@/lib/llms-utils";
import {source} from "@/lib/source";

export const revalidate = false;

export async function GET(_req: NextRequest, {params}: {params: Promise<{slug: string[]}>}) {
  try {
    const slug = (await params).slug;
    const page = source.getPage(slug);

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

export function generateStaticParams() {
  return source.generateParams().filter((param) => param.slug && param.slug.length > 0);
}
