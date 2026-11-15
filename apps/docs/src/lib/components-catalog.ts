import "server-only";

import type {StatusChipStatus} from "@/components/status-chip";
import type {ComponentMedia, ComponentsPlatform} from "@/lib/pro-components";

import {cache} from "react";

import {getDictionary, hasLocale} from "@/lib/dictionaries";
import {getProCatalog, getProComponentUrl, toComponentName} from "@/lib/pro-components";
import {source} from "@/lib/source";
import {CDN_URL} from "@/utils/constants";

export interface CatalogItem {
  name: string;
  title: string;
  description: string;
  href: string;
  pro: boolean;
  status?: StatusChipStatus;
  media: ComponentMedia;
}

export interface CatalogCategory {
  /** Route-group slug, also the section anchor (e.g. `"date-and-time"`). */
  id: string;
  title: string;
  items: CatalogItem[];
}

export interface ComponentsCatalog {
  platform: ComponentsPlatform;
  categories: CatalogCategory[];
}

/**
 * Free components on the index, keyed by category (the route-group folder).
 * Kept in code rather than derived from `meta.json` so a component shows up
 * here only once it is intentionally added.
 */
const FREE_COMPONENTS: Record<ComponentsPlatform, Record<string, string[]>> = {
  native: {
    buttons: ["button", "close-button", "link-button"],
    collections: ["menu", "tag-group"],
    controls: ["slider", "switch"],
    "data-display": ["chip"],
    feedback: ["alert", "skeleton", "skeleton-group", "spinner"],
    forms: [
      "checkbox",
      "control-field",
      "description",
      "field-error",
      "input",
      "input-group",
      "input-otp",
      "label",
      "radio-group",
      "search-field",
      "select",
      "text-area",
      "text-field",
    ],
    layout: ["card", "separator", "surface"],
    media: ["avatar"],
    navigation: ["accordion", "list-group", "tabs"],
    overlays: ["bottom-sheet", "dialog", "popover", "toast"],
    typography: ["text"],
    utilities: ["pressable-feedback", "scroll-shadow"],
  },
  react: {
    buttons: ["button", "button-group", "close-button", "toggle-button", "toggle-button-group"],
    collections: ["dropdown", "list-box", "tag-group"],
    colors: [
      "color-area",
      "color-field",
      "color-picker",
      "color-slider",
      "color-swatch",
      "color-swatch-picker",
    ],
    controls: ["slider", "switch"],
    "data-display": ["badge", "chip", "table"],
    "date-and-time": [
      "calendar",
      "date-field",
      "date-picker",
      "date-range-picker",
      "range-calendar",
      "time-field",
    ],
    feedback: ["alert", "meter", "progress-bar", "progress-circle", "skeleton", "spinner"],
    forms: [
      "checkbox",
      "checkbox-group",
      "description",
      "error-message",
      "field-error",
      "fieldset",
      "form",
      "input",
      "input-group",
      "input-otp",
      "label",
      "number-field",
      "radio-group",
      "search-field",
      "text-field",
      "text-area",
    ],
    layout: ["card", "separator", "surface", "toolbar"],
    media: ["avatar", "avatar-group"],
    navigation: [
      "accordion",
      "breadcrumbs",
      "disclosure",
      "disclosure-group",
      "link",
      "pagination",
      "tabs",
    ],
    overlays: ["alert-dialog", "drawer", "modal", "popover", "toast", "tooltip", "sheet"],
    pickers: ["autocomplete", "combo-box", "select"],
    typography: ["kbd", "typography"],
    utilities: ["scroll-shadow"],
  },
};

/** Section order for both platforms; categories not listed here go last. */
const CATEGORY_ORDER = [
  "buttons",
  "forms",
  "date-and-time",
  "navigation",
  "overlays",
  "collections",
  "controls",
  "feedback",
  "layout",
  "media",
  "pickers",
  "typography",
  "data-display",
  "charts",
  "ai",
  "colors",
  "utilities",
];

/** Pro components shown under a different category than the one they have on the Pro site. */
const PRO_CATEGORY_OVERRIDES: Record<ComponentsPlatform, Record<string, string>> = {
  native: {},
  react: {"emoji-reaction-button": "buttons"},
};

const STATUS_ICONS = new Set<string>(["new", "new-dot", "preview", "updated"]);
const NATIVE_VIDEO_BASE_URL = `${CDN_URL}/docs/native/components/videos`;
const NATIVE_VIDEO_NAME_OVERRIDES: Record<string, string> = {"skeleton-group": "skeleton"};

function toStatus(icon: string | undefined): StatusChipStatus | undefined {
  return icon && STATUS_ICONS.has(icon) ? (icon as StatusChipStatus) : undefined;
}

function getFreeMedia(platform: ComponentsPlatform, name: string, title: string): ComponentMedia {
  if (platform === "native") {
    const videoName = NATIVE_VIDEO_NAME_OVERRIDES[name] ?? name;

    return {
      dark: `${NATIVE_VIDEO_BASE_URL}/${videoName}-docs-dark.mp4`,
      light: `${NATIVE_VIDEO_BASE_URL}/${videoName}-docs-light.mp4`,
      type: "video",
    };
  }

  // Localized titles read "<English> <Chinese>"; images are named after the English part.
  const imageName = title.toLowerCase().split(" ")[0];

  return {
    dark: `${CDN_URL}/docs/related-components/dark-${imageName}.png`,
    light: `${CDN_URL}/docs/related-components/light-${imageName}.png`,
    type: "image",
  };
}

function getFreeItems(platform: ComponentsPlatform, locale: string) {
  return Object.entries(FREE_COMPONENTS[platform]).flatMap(([categoryId, names]) =>
    names.flatMap((name) => {
      const page = source.getPage([platform, "components", name], locale);

      if (!page) return [];

      const title = page.data.title || name;
      const item: CatalogItem = {
        description: page.data.description || "",
        href: page.url,
        media: getFreeMedia(platform, name, title),
        name,
        pro: false,
        status: toStatus(page.data.icon),
        title,
      };

      return [{categoryId, item}];
    }),
  );
}

async function getProItems(platform: ComponentsPlatform) {
  const categories = (await getProCatalog())[platform];

  return categories.flatMap((category) =>
    category.components.map((component) => {
      const item: CatalogItem = {
        description: component.description,
        href: getProComponentUrl(component.href, "components_index"),
        media: component.media,
        name: component.name,
        pro: true,
        status: toStatus(component.status),
        title: toComponentName(component.title),
      };

      return {
        categoryId: PRO_CATEGORY_OVERRIDES[platform][component.name] ?? category.id,
        categoryTitle: category.title,
        item,
      };
    }),
  );
}

function categoryRank(id: string) {
  const index = CATEGORY_ORDER.indexOf(id);

  return index === -1 ? CATEGORY_ORDER.length : index;
}

/**
 * Free and Pro components for one platform, grouped into sections. Pro
 * components come from the Pro docs; a free component wins when both define
 * the same name.
 */
export const getComponentsCatalog = cache(
  async (platform: ComponentsPlatform, locale: string): Promise<ComponentsCatalog> => {
    const dictionary = await getDictionary(hasLocale(locale) ? locale : "en");
    const categoryTitles: Record<string, string> = dictionary.componentsIndex.categories;
    const freeItems = getFreeItems(platform, locale);
    const freeNames = new Set(freeItems.map(({item}) => item.name));
    const proItems = (await getProItems(platform)).filter(({item}) => !freeNames.has(item.name));
    const categories = new Map<string, CatalogCategory>();

    const entries: {categoryId: string; categoryTitle?: string; item: CatalogItem}[] = [
      ...freeItems,
      ...proItems,
    ];

    for (const entry of entries) {
      let category = categories.get(entry.categoryId);

      if (!category) {
        category = {
          id: entry.categoryId,
          items: [],
          title: categoryTitles[entry.categoryId] ?? entry.categoryTitle ?? entry.categoryId,
        };
        categories.set(entry.categoryId, category);
      }

      category.items.push(entry.item);
    }

    const sorted = [...categories.values()]
      .sort((a, b) => categoryRank(a.id) - categoryRank(b.id))
      .map((category) => ({
        ...category,
        items: [...category.items].sort((a, b) => a.title.localeCompare(b.title, "en")),
      }));

    return {categories: sorted, platform};
  },
);
