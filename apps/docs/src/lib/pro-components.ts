import "server-only";

import {cache} from "react";

import {env} from "~env";

export type ComponentsPlatform = "react" | "native";

export interface ComponentMedia {
  type: "image" | "video";
  light: string;
  dark: string;
}

export interface ProCatalogComponent {
  name: string;
  title: string;
  description: string;
  /** Path on the Pro site, including its `/docs` base path. */
  href: string;
  status?: string;
  media: ComponentMedia;
}

export interface ProCatalogCategory {
  /** Route-group slug, e.g. `"data-display"`. */
  id: string;
  title: string;
  components: ProCatalogComponent[];
}

type ProCatalog = Record<ComponentsPlatform, ProCatalogCategory[]>;

export const PRO_URL = env.NEXT_PUBLIC_PRO_URL ?? "https://heroui.pro";

const EMPTY_CATALOG: ProCatalog = {native: [], react: []};

function isCategoryList(value: unknown): value is ProCatalogCategory[] {
  return (
    Array.isArray(value) &&
    value.every(
      (category) =>
        typeof category?.id === "string" &&
        typeof category?.title === "string" &&
        Array.isArray(category?.components),
    )
  );
}

/**
 * Every Pro component, served by the Pro docs at `/docs/api/pro-components`.
 * Revalidated hourly; resolves to empty lists when the Pro docs are unreachable
 * so the components index still renders the free components.
 */
export const getProCatalog = cache(async (): Promise<ProCatalog> => {
  try {
    const response = await fetch(`${PRO_URL}/docs/api/pro-components`, {
      next: {revalidate: 3600},
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) return EMPTY_CATALOG;

    const data: unknown = await response.json();
    const {native, react} = (data ?? {}) as Partial<Record<ComponentsPlatform, unknown>>;

    return {
      native: isCategoryList(native) ? native : [],
      react: isCategoryList(react) ? react : [],
    };
  } catch {
    return EMPTY_CATALOG;
  }
});

/** Absolute link to a Pro component page, tagged with where in the docs it was opened from. */
export function getProComponentUrl(href: string, medium: "components_index" | "search") {
  const url = new URL(href, PRO_URL);

  url.searchParams.set("utm_source", "heroui_docs");
  url.searchParams.set("utm_medium", medium);
  url.searchParams.set("utm_campaign", "pro_components");

  return url.toString();
}

/** `"Area Chart"` → `"AreaChart"`, matching the free components' names. */
export function toComponentName(title: string) {
  return title.replace(/\s+/g, "");
}

/** What the ⌘K search needs to list a Pro component. */
export interface ProSearchItem {
  name: string;
  title: string;
  description: string;
  url: string;
  platform: ComponentsPlatform;
}

/** Every Pro component as a flat list for the ⌘K search, loaded with the layout. */
export async function getProSearchItems(): Promise<ProSearchItem[]> {
  const catalog = await getProCatalog();

  return (["react", "native"] as const).flatMap((platform) =>
    catalog[platform].flatMap((category) =>
      category.components.map((component) => ({
        description: component.description,
        name: component.name,
        platform,
        title: toComponentName(component.title),
        url: getProComponentUrl(component.href, "search"),
      })),
    ),
  );
}
