import {getLLMText} from "@/lib/get-llm-text";
import {source} from "@/lib/source";

// Disable revalidation for consistent AI-readable content
export const revalidate = false;

export async function GET() {
  // Get all documentation pages
  const pages = source.getPages();

  // Process each page to extract text content
  const scan = pages.map(getLLMText);
  const scanned = await Promise.all(scan);

  // Add header information
  const header = [
    "# HeroUI v3 Documentation",
    "",
    "This is the complete documentation for HeroUI v3, a modern React UI library built with Tailwind CSS v4.",
    "",
    "Repository: https://github.com/jrgarciadev/heroui-v3",
    "Website: https://heroui.dev",
    "",
    "## Technical Stack",
    "- React 19+",
    "- Tailwind CSS v4",
    "- TypeScript",
    "- React Aria Components for accessibility",
    "- Compound component pattern inspired by Radix UI",
    "",
    "---",
    "",
  ].join("\n");

  // Join all page contents with double newlines
  const content = header + scanned.join("\n\n---\n\n");

  // Return as plain text response
  return new Response(content, {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Content-Type": "text/plain",
    },
  });
}
