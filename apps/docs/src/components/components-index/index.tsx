import type {ComponentsCatalog} from "@/lib/components-catalog";
import type {ComponentsPlatform} from "@/lib/pro-components";
import type {TOCItemType} from "fumadocs-core/toc";

import {getComponentsCatalog} from "@/lib/components-catalog";

import {ComponentsIndexView} from "./components-index-view";

const COMPONENTS_INDEX_TAG = /<ComponentsIndex\s+platform=["'](react|native)["']/;

/** Platform of the `<ComponentsIndex />` an MDX page renders, if any. */
export function getComponentsIndexPlatform(mdx: string): ComponentsPlatform | null {
  return (mdx.match(COMPONENTS_INDEX_TAG)?.[1] as ComponentsPlatform | undefined) ?? null;
}

/** One TOC entry per category section. */
export function getComponentsIndexToc(catalog: ComponentsCatalog): TOCItemType[] {
  return catalog.categories.map((category) => ({
    depth: 2,
    title: category.title,
    url: `#${category.id}`,
  }));
}

/** Free and Pro components for a platform, rendered from MDX as `<ComponentsIndex platform="react" />`. */
export async function ComponentsIndex({
  locale = "en",
  platform,
}: {
  locale?: string;
  platform: ComponentsPlatform;
}) {
  const catalog = await getComponentsCatalog(platform, locale);

  return <ComponentsIndexView catalog={catalog} />;
}
