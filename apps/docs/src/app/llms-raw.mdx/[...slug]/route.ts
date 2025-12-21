import type {NextRequest} from "next/server";

import {notFound} from "next/navigation";
import {NextResponse} from "next/server";

import {getLLMRawText} from "@/lib/get-llm-text";
import {source} from "@/lib/source";

export const revalidate = false;

export async function GET(_req: NextRequest, {params}: {params: Promise<{slug: string[]}>}) {
  const {slug} = await params;
  const page = source.getPage(slug);

  if (!page) notFound();

  const content = await getLLMRawText(page);

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

export function generateStaticParams() {
  return source.generateParams().filter((param) => param.slug?.length > 0);
}
