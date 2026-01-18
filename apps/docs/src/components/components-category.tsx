import type {StatusChipStatus} from "./status-chip";

import {cn} from "@/utils/cn";

import {getComponentInfo} from "../components-registry";
import {source} from "../lib/source";

import {ComponentItem} from "./component-item";

// Component groups matching meta.json structure
const COMPONENT_GROUPS = [
  {
    category: "Buttons",
    components: ["button", "button-group", "close-button"],
  },
  {
    category: "Forms",
    components: [
      "checkbox",
      "checkbox-group",
      "date-field",
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
      "textarea",
      "time-field",
    ],
  },
  {
    category: "Navigation",
    components: ["accordion", "breadcrumbs", "disclosure", "disclosure-group", "link", "tabs"],
  },
  {
    category: "Overlays",
    components: ["alert-dialog", "modal", "popover", "tooltip"],
  },
  {
    category: "Collections",
    components: ["dropdown", "listbox", "tag-group"],
  },
  {
    category: "Controls",
    components: ["slider", "switch"],
  },
  {
    category: "Feedback",
    components: ["alert", "skeleton", "spinner"],
  },
  {
    category: "Layout",
    components: ["card", "separator", "surface"],
  },
  {
    category: "Media",
    components: ["avatar"],
  },
  {
    category: "Pickers",
    components: ["autocomplete", "combobox", "select"],
  },
  {
    category: "Typography",
    components: ["kbd"],
  },
  {
    category: "Data Display",
    components: ["chip"],
  },
  {
    category: "Utilities",
    components: ["scroll-shadow"],
  },
] as const;

const componentStatusIcons = ["preview", "new", "updated", "new-dot"];

interface ComponentWithStatus {
  component: NonNullable<ReturnType<typeof getComponentInfo>>;
  status?: StatusChipStatus;
}

interface ComponentCategory {
  category: string;
}

function getComponentWithStatus(name: string): ComponentWithStatus | null {
  const componentInfo = getComponentInfo(name);

  if (!componentInfo) return null;

  // Get page data to check for status icon
  const pagePath = componentInfo.href.replace("/docs/", "").split("/").filter(Boolean);
  const page = source.getPage(pagePath);
  const icon = page?.data.icon;
  const status: StatusChipStatus | undefined =
    icon && componentStatusIcons.includes(icon) ? (icon as StatusChipStatus) : undefined;

  return {
    component: componentInfo,
    status,
  };
}

export function ComponentsCategory({category}: ComponentCategory) {
  const group = COMPONENT_GROUPS.find((group) => group.category === category);

  if (!group) return null;

  const components = group.components
    .map(getComponentWithStatus)
    .filter((item): item is ComponentWithStatus => item !== null);

  if (components.length === 0) return null;

  return (
    <div className={cn("not-prose flex flex-col gap-12")}>
      <div key={group.category} className="flex flex-col gap-6">
        <div className={cn("grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3")}>
          {components.map(({component, status}) => (
            <ComponentItem
              key={component.name}
              component={component}
              openInNewTab={false}
              status={status}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
