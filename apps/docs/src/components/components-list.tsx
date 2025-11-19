import type {StatusChipStatus} from "./status-chip";

import {cn} from "@/utils/cn";

import {getComponentInfo} from "../components-registry";
import {source} from "../lib/source";

import {ComponentItem} from "./component-item";

// Component names in the exact order from meta.json (lines 26-59)
const COMPONENT_NAMES = [
  "accordion",
  "alert",
  "avatar",
  "button",
  "card",
  "checkbox",
  "checkbox-group",
  "chip",
  "close-button",
  "combobox",
  "description",
  "disclosure",
  "disclosure-group",
  "dropdown",
  "field-error",
  "fieldset",
  "form",
  "input",
  "input-otp",
  "kbd",
  "label",
  "link",
  "listbox",
  "modal",
  "number-field",
  "popover",
  "radio-group",
  "separator",
  "select",
  "skeleton",
  "slider",
  "spinner",
  "switch",
  "surface",
  "tabs",
  "text-field",
  "textarea",
  "tooltip",
] as const;

const componentStatusIcons = ["preview", "new", "updated", "new-dot"];

export function ComponentsList() {
  const components = COMPONENT_NAMES.map((name) => {
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
  }).filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <div
      className={cn("not-prose grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3")}
    >
      {components.map(({component, status}) => (
        <ComponentItem
          key={component.name}
          component={component}
          openInNewTab={false}
          status={status}
        />
      ))}
    </div>
  );
}
