import type {StatusChipStatus} from "./status-chip";

import {cn} from "@/utils/cn";

import {source} from "../lib/source";

import {NativeComponentItem} from "./native-component-item";

// Component groups matching meta.json structure
const COMPONENT_GROUPS = [
  {
    category: "Buttons",
    components: ["(buttons)/button"],
  },
  {
    category: "Forms",
    components: [
      "(forms)/checkbox",
      "(forms)/description",
      "(forms)/form-field",
      "(forms)/field-error",
      "(forms)/input",
      "(forms)/input-otp",
      "(forms)/label",
      "(forms)/radio-group",
      "(forms)/select",
      "(forms)/switch",
      "(forms)/text-field",
    ],
  },
  {
    category: "Navigation",
    components: ["(navigation)/accordion", "(navigation)/tabs"],
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
    components: ["(feedback)/skeleton", "(feedback)/skeleton-group", "(feedback)/spinner"],
  },
  {
    category: "Layout",
    components: ["(layout)/card", "(layout)/divider", "(layout)/surface"],
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
}

function getComponentNameFromPath(path: string): string {
  // Extract component name from path like "(buttons)/button" -> "button"
  // or "(forms)/text-field" -> "text-field"
  return path.split("/").pop() || path;
}

// Overrides for components that use different video filenames than their component name
const VIDEO_NAME_OVERRIDES: Record<string, string> = {
  "skeleton-group": "skeleton",
};

function constructVideoUrls(componentName: string): {srcLight: string; srcDark: string} {
  // Convert component name to video filename pattern
  // e.g., "button" -> "button-docs-light.mp4"
  // e.g., "text-field" -> "text-field-docs-light.mp4"
  // Use override if available, otherwise use component name
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

function getComponentWithStatus(path: string): ComponentWithStatus | null {
  // Route groups (parentheses) are part of the file path but filtered out in URL paths
  // So "(buttons)/button" becomes "button" in the URL
  const pathWithoutRouteGroups = path
    .split("/")
    .filter((part) => !isRouteGroup(part))
    .join("/");

  // Construct href - route groups are filtered out in the URL path
  const href = `/docs/native/components/${pathWithoutRouteGroups}`;

  // Get page data from source - use path without route groups
  const pagePath = ["native", "components", ...pathWithoutRouteGroups.split("/")].filter(Boolean);
  const page = source.getPage(pagePath);

  if (!page) return null;

  const title = page.data.title || "";
  const description = page.data.description || "";
  const componentName = getComponentNameFromPath(path);

  // Get status icon if present
  const icon = page.data.icon;
  const status: StatusChipStatus | undefined =
    icon && componentStatusIcons.includes(icon) ? (icon as StatusChipStatus) : undefined;

  // Construct video URLs
  const {srcDark, srcLight} = constructVideoUrls(componentName);

  return {
    component: {
      category: undefined,
      description,
      href,
      name: componentName,
      title,
    },
    srcDark,
    srcLight,
    status,
  };
}

export function NativeComponentsCategory({category}: ComponentCategory) {
  const group = COMPONENT_GROUPS.find((group) => group.category === category);

  if (!group) return null;

  const components = group.components
    .map(getComponentWithStatus)
    .filter((item): item is ComponentWithStatus => item !== null);

  if (components.length === 0) return null;

  return (
    <div className={cn("not-prose flex flex-col gap-12")}>
      <div key={group.category} className="flex flex-col gap-6">
        <div className={cn("grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2")}>
          {components.map(({component, srcDark, srcLight, status}) => (
            <NativeComponentItem
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
