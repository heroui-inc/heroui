import {getLLMText} from "@/lib/get-llm-text";
import {LLMS_TEXT_HEADERS, filterExcludedPages, filterPagesByType} from "@/lib/llms-utils";
import {source} from "@/lib/source";

export const revalidate = false;

export async function GET() {
  try {
    const pages = filterExcludedPages(source.getPages());
    const componentPages = filterPagesByType(pages, "components");

    if (componentPages.length === 0) {
      return new Response("No component documentation found", {
        headers: LLMS_TEXT_HEADERS,
        status: 404,
      });
    }

    const scan = componentPages.map(getLLMText);
    const scanned = await Promise.all(scan);

    const content = scanned.join("\n\n");

    return new Response(content, {
      headers: LLMS_TEXT_HEADERS,
    });
  } catch (error) {
    console.error("Error generating llms-components.txt:", error);

    return new Response("Error generating component documentation", {
      headers: LLMS_TEXT_HEADERS,
      status: 500,
    });
  }
}
