import {getLLMText} from "@/lib/get-llm-text";
import {LLMS_TEXT_HEADERS, filterExcludedPages} from "@/lib/llms-utils";
import {source} from "@/lib/source";

export const revalidate = false;

export async function GET() {
  try {
    const pages = filterExcludedPages(source.getPages());

    if (pages.length === 0) {
      return new Response("No content found", {
        headers: LLMS_TEXT_HEADERS,
        status: 404,
      });
    }

    const scan = pages.map(getLLMText);
    const scanned = await Promise.all(scan);

    const content = scanned.join("\n\n");

    return new Response(content, {
      headers: LLMS_TEXT_HEADERS,
    });
  } catch (error) {
    console.error("Error generating llms-full.txt:", error);

    return new Response("Error generating full documentation", {
      headers: LLMS_TEXT_HEADERS,
      status: 500,
    });
  }
}
