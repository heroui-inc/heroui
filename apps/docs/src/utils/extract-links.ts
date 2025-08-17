import matter from "gray-matter";

import {COMPONENT_PATH, COMPONENT_STYLES_PATH, STORYBOOK_URL} from "@/utils/constants";

export interface ComponentLinksType {
  rac?: string;
  radix?: string;
  source?: string;
  styles?: string;
  storybook?: string;
  [key: string]: string | undefined;
}

/**
 * Extracts the links field from MDX frontmatter
 * @param content - The raw MDX content string
 * @returns The parsed links object or null if not found
 */
export function extractLinksFromMDX(content: string): ComponentLinksType | null {
  try {
    const {data} = matter(content);

    if (data["links"] && typeof data["links"] === "object") {
      return data["links"] as ComponentLinksType;
    }

    return null;
  } catch (error) {
    console.error("Error extracting links from MDX:", error);

    return null;
  }
}

/**
 * Generates component link URLs based on the extracted links
 * @param links - The extracted links object
 * @returns An object with formatted URLs
 */
export function generateComponentLinks(links: ComponentLinksType | null) {
  if (!links) return null;

  return {
    rac: links.rac ? `https://react-spectrum.adobe.com/react-aria/${links.rac}.html` : undefined,
    radix: links.radix
      ? `https://www.radix-ui.com/primitives/docs/components/${links.radix}`
      : undefined,
    source: links.source ? `${COMPONENT_PATH}/${links.source}` : undefined,
    styles: links.styles ? `${COMPONENT_STYLES_PATH}/${links.styles}` : undefined,
    storybook: links.storybook
      ? `${STORYBOOK_URL}/?path=/story/components-${links.storybook}`
      : undefined,
  };
}
