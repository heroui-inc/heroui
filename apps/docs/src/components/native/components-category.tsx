import type {StatusChipStatus} from "../status-chip";

import {cn} from "@/utils/cn";

import {source} from "../../lib/source";

import {ComponentItem} from "./component-item";

/**
 * Catalogue of every native component, grouped by category. This list mirrors
 * the structure of `meta.json` under `content/docs/native/components` —
 * keeping it in code (rather than auto-deriving from the filesystem) gives
 * the docs team explicit control over category ordering and lets new
 * components show up only after they're intentionally added here.
 */
const COMPONENT_GROUPS = [
  {
    category: "Buttons",
    components: ["(buttons)/button", "(buttons)/close-button", "(buttons)/link-button"],
  },
  {
    category: "Collections",
    components: ["(collections)/menu", "(collections)/tag-group"],
  },
  {
    category: "Controls",
    components: ["(controls)/slider", "(controls)/switch"],
  },
  {
    category: "Forms",
    components: [
      "(forms)/checkbox",
      "(forms)/control-field",
      "(forms)/description",
      "(forms)/field-error",
      "(forms)/input",
      "(forms)/input-group",
      "(forms)/input-otp",
      "(forms)/label",
      "(forms)/radio-group",
      "(forms)/search-field",
      "(forms)/select",
      "(forms)/text-area",
      "(forms)/text-field",
    ],
  },
  {
    category: "Navigation",
    components: ["(navigation)/accordion", "(navigation)/list-group", "(navigation)/tabs"],
  },
  {
    category: "Overlays",
    components: [
      "(overlays)/bottom-sheet",
      "(overlays)/dialog",
      "(overlays)/popover",
      "(overlays)/toast",
    ],
  },
  {
    category: "Feedback",
    components: [
      "(feedback)/alert",
      "(feedback)/skeleton",
      "(feedback)/skeleton-group",
      "(feedback)/spinner",
    ],
  },
  {
    category: "Layout",
    components: ["(layout)/card", "(layout)/separator", "(layout)/surface"],
  },
  {
    category: "Media",
    components: ["(media)/avatar"],
  },
  {
    category: "Data Display",
    components: ["(data-display)/chip"],
  },
  {
    category: "Typography",
    components: ["(typography)/text"],
  },
  {
    category: "Utilities",
    components: ["(utilities)/pressable-feedback", "(utilities)/scroll-shadow"],
  },
] as const;

const componentStatusIcons = ["preview", "new", "updated", "new-dot"];

const VIDEO_BASE_URL =
  "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/native/components/videos";

interface ComponentWithStatus {
  component: {
    name: string;
    title: string;
    description: string;
    href: string;
    category?: string;
  };
  srcLight: string;
  srcDark: string;
  status?: StatusChipStatus;
}

interface ComponentCategory {
  category: string;
  locale: string;
}

function getComponentNameFromPath(path: string): string {
  return path.split("/").pop() || path;
}

/**
 * Overrides for components whose preview video filename doesn't match the
 * component name 1:1. Right now only `skeleton-group` reuses the `skeleton`
 * video — the rest fall through to the default name-based pattern.
 */
const VIDEO_NAME_OVERRIDES: Record<string, string> = {
  "skeleton-group": "skeleton",
};

function constructVideoUrls(componentName: string): {srcLight: string; srcDark: string} {
  const videoName = VIDEO_NAME_OVERRIDES[componentName.toLowerCase()] || componentName;
  const baseName = videoName.toLowerCase();

  return {
    srcDark: `${VIDEO_BASE_URL}/${baseName}-docs-dark.mp4`,
    srcLight: `${VIDEO_BASE_URL}/${baseName}-docs-light.mp4`,
  };
}

function isRouteGroup(part: string): boolean {
  return part.startsWith("(") && part.endsWith(")");
}

/**
 * Pull metadata for a single component out of Fumadocs' page tree. Returns
 * `null` when the page isn't found so the caller can `.filter()` missing
 * entries away without throwing.
 */
function getComponentWithStatus(path: string, locale: string): ComponentWithStatus | null {
  // Route groups (parentheses) are part of the file path but filtered out
  // in URL paths. So `(buttons)/button` becomes `button` in the URL.
  const pathWithoutRouteGroups = path
    .split("/")
    .filter((part) => !isRouteGroup(part))
    .join("/");

  const pagePath = ["native", "components", ...pathWithoutRouteGroups.split("/")].filter(Boolean);
  const page = source.getPage(pagePath, locale);

  if (!page) return null;

  const title = page.data.title || "";
  const description = page.data.description || "";
  const componentName = getComponentNameFromPath(path);

  const icon = page.data.icon;
  const status: StatusChipStatus | undefined =
    icon && componentStatusIcons.includes(icon) ? (icon as StatusChipStatus) : undefined;

  const {srcDark, srcLight} = constructVideoUrls(componentName);

  return {
    component: {
      category: undefined,
      description,
      href: page.url,
      name: componentName,
      title,
    },
    srcDark,
    srcLight,
    status,
  };
}

/**
 * Render a single category section of the components overview, used in
 * MDX as `<ComponentsCategory category="Forms" />`.
 *
 * Renders nothing when the category name isn't recognised or when every
 * component in the category fails to resolve to a page — this keeps the MDX
 * surface forgiving while a category is being built out.
 */
export function ComponentsCategory({category, locale}: ComponentCategory) {
  const group = COMPONENT_GROUPS.find((group) => group.category === category);

  if (!group) return null;

  const components = group.components
    .map((path) => getComponentWithStatus(path, locale))
    .filter((item): item is ComponentWithStatus => item !== null);

  if (components.length === 0) return null;

  return (
    <div className={cn("not-prose flex flex-col gap-12")}>
      <div key={group.category} className="flex flex-col gap-6">
        <div className={cn("grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2")}>
          {components.map(({component, srcDark, srcLight, status}) => (
            <ComponentItem
              key={component.name}
              component={component}
              openInNewTab={false}
              srcDark={srcDark}
              srcLight={srcLight}
              status={status}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
