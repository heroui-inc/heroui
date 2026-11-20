import type {ComponentsCatalog} from "@/lib/components-catalog";
import type {ComponentsPlatform} from "@/lib/pro-components";

const COMPONENTS_INDEX_TAG = /<ComponentsIndex\s+platform\s*=\s*["'](react|native)["']\s*\/>/g;

/** The components index as Markdown: one heading per category, one link per component. */
export function componentsCatalogToMarkdown(catalog: ComponentsCatalog): string {
  return catalog.categories
    .map((category) => {
      const items = category.items.map((item) => {
        const pro = item.pro ? " (Pro)" : "";
        const description = item.description ? `: ${item.description}` : "";

        return `- [${item.title}](${item.href})${pro}${description}`;
      });

      return `## ${category.title}\n\n${items.join("\n")}`;
    })
    .join("\n\n");
}

/**
 * Expand `<ComponentsIndex platform="…" />` in the machine-readable page so it
 * lists the same free and Pro components as the rendered index.
 */
export async function replaceComponentsIndex(
  content: string,
  loadCatalog: (platform: ComponentsPlatform) => Promise<ComponentsCatalog>,
): Promise<string> {
  let result = content;

  for (const match of content.matchAll(COMPONENTS_INDEX_TAG)) {
    const markdown = componentsCatalogToMarkdown(await loadCatalog(match[1] as ComponentsPlatform));

    result = result.replace(match[0], () => markdown);
  }

  return result;
}
