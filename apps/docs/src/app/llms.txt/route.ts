import {source} from "@/lib/source";

// Disable revalidation for consistent AI-readable content
export const revalidate = false;

export async function GET() {
  // Get all documentation pages
  const pages = source.getPages();

  // Create a simplified text representation for LLMs
  const content = [
    "# HeroUI v3 Documentation Summary",
    "",
    "HeroUI v3 is a modern React UI library built with Tailwind CSS v4, focusing on accessibility and developer experience.",
    "",
    "## Available Documentation Pages:",
    "",
  ];

  // Group pages by category
  const categories: Record<string, typeof pages> = {};

  pages.forEach((page) => {
    const category = page.slugs[0] || "root";

    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(page);
  });

  // Format pages by category
  Object.entries(categories).forEach(([category, categoryPages]) => {
    content.push(`### ${category.charAt(0).toUpperCase() + category.slice(1)}`);
    content.push("");

    categoryPages.forEach((page) => {
      const title = page.data.title;
      const description = page.data.description || "No description available";
      const url = `https://heroui.dev${page.url}`;

      content.push(`- **${title}**: ${description}`);
      content.push(`  URL: ${url}`);
    });

    content.push("");
  });

  // Add technical information
  content.push("## Technical Requirements:");
  content.push("- React 19+");
  content.push("- Tailwind CSS v4 (required)");
  content.push("- Node.js 22+");
  content.push("- TypeScript 5.8+");
  content.push("");
  content.push("## Key Features:");
  content.push("- Compound component pattern inspired by Radix UI");
  content.push("- Built on React Aria Components for accessibility");
  content.push("- Full TypeScript support");
  content.push("- Tailwind CSS v4 styling with CSS variables");
  content.push("- Dark mode support");
  content.push("- Responsive design");
  content.push("");
  content.push("For full documentation with code examples, visit: https://heroui.dev/docs");

  // Return as plain text response
  return new Response(content.join("\n"), {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
