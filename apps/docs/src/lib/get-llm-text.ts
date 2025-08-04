/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-console */
/* eslint-disable unused-imports/no-unused-vars */
// @ts-nocheck

import type {Page} from "fumadocs-core/source";

export async function getLLMText(page: Page): Promise<string> {
  try {
    // Get the MDX content
    const MDXContent = page.data?.body;

    // Create a structured text representation of the page
    const sections = [`Page: ${page.data.title}`, `URL: ${page.url}`];

    if (page.data.description) {
      sections.push(`Description: ${page.data.description}`);
    }

    // Try to get the raw content if available
    if (page.data?.content) {
      sections.push(`\nContent:\n${page.data.content}`);
    } else if (page.data?.raw) {
      sections.push(`\nContent:\n${page.data.raw}`);
    } else {
      // Fallback to basic info if no raw content available
      sections.push(`\nThis page contains React components and interactive content.`);
    }

    return sections.join("\n");
  } catch (error) {
    console.error(`Error processing page ${page.url}:`, error);

    return `Page: ${page.data.title}\nURL: ${page.url}\nError: Unable to extract content`;
  }
}
