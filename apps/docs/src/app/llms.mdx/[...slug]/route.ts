import type {NextRequest} from "next/server";

import {notFound} from "next/navigation";
import {NextResponse} from "next/server";

import {getLLMText} from "@/lib/get-llm-text";
import {source} from "@/lib/source";

export const revalidate = false;

export async function GET(_req: NextRequest, {params}: {params: Promise<{slug: string[]}>}) {
  const slug = (await params).slug;

  // Validate slug exists and has at least one element
  if (!slug || slug.length === 0) {
    notFound();
  }

  const page =
    slug[0] === "index"
      ? source.getPages().find((p) => p.path === "index.mdx")
      : source.getPage(slug);

  if (!page) notFound();

  return new NextResponse(await getLLMText(page));
}

export function generateStaticParams() {
  return source.generateParams();
}
