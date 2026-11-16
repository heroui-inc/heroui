import "server-only";

import type {CatalogItem} from "@/lib/components-catalog";

import {getRelatedComponents} from "@/components-registry";
import {getFreeMedia} from "@/lib/components-catalog";
import {getProCatalog, getProComponentUrl, toComponentName} from "@/lib/pro-components";

const MAX_RELATED = 3;

/**
 * Pro components worth suggesting from a free component's page, most relevant
 * first. Keys are normalized free names (as in `components-registry`), values
 * are Pro component names; names the Pro catalog doesn't list are skipped.
 */
const PRO_RELATED_COMPONENTS: Record<string, string[]> = {
  accordion: ["file-tree", "floating-toc"],
  autocomplete: ["command", "inline-select"],
  avatar: ["item-card", "hover-card"],
  avatargroup: ["item-card-group", "hover-card"],
  badge: ["trend-chip", "number-value"],
  breadcrumbs: ["navbar", "sidebar", "app-layout"],
  button: ["emoji-reaction-button", "pressable-feedback", "action-bar"],
  buttongroup: ["action-bar", "segment", "checkbox-button-group"],
  calendar: ["agenda"],
  card: ["item-card", "widget", "holo-card"],
  checkbox: ["checkbox-button-group", "cell-switch"],
  checkboxgroup: ["checkbox-button-group"],
  chip: ["trend-chip"],
  colorarea: ["cell-color-picker"],
  colorfield: ["cell-color-picker"],
  colorpicker: ["cell-color-picker"],
  colorslider: ["cell-color-picker", "cell-slider"],
  colorswatch: ["cell-color-picker"],
  colorswatchpicker: ["cell-color-picker"],
  combobox: ["command", "inline-select", "cell-select"],
  datepicker: ["agenda"],
  daterangepicker: ["agenda"],
  disclosure: ["file-tree"],
  disclosuregroup: ["file-tree", "floating-toc"],
  drawer: ["sidebar", "resizable"],
  dropdown: ["context-menu", "command", "inline-select"],
  form: ["drop-zone", "rich-text-editor", "number-stepper"],
  input: ["prompt-input", "number-stepper"],
  inputgroup: ["prompt-input"],
  kbd: ["command"],
  listbox: ["list-view", "command"],
  meter: ["kpi", "number-value"],
  modal: ["command"],
  numberfield: ["number-stepper", "number-value"],
  pagination: ["data-grid", "carousel"],
  popover: ["hover-card", "emoji-picker", "context-menu"],
  progressbar: ["stepper", "kpi"],
  progresscircle: ["radial-chart", "kpi"],
  radiogroup: ["radio-button-group", "segment"],
  rangecalendar: ["agenda"],
  scrollshadow: ["carousel"],
  searchfield: ["command"],
  select: ["cell-select", "inline-select", "native-select"],
  separator: ["resizable"],
  sheet: ["sidebar"],
  skeleton: ["text-shimmer", "chat-loader"],
  slider: ["cell-slider", "rating"],
  spinner: ["chat-loader", "text-shimmer"],
  surface: ["widget", "item-card"],
  switch: ["cell-switch"],
  table: ["data-grid", "list-view", "kanban"],
  tabs: ["segment", "stepper", "navbar"],
  textarea: ["rich-text-editor", "prompt-input"],
  textfield: ["prompt-input", "rich-text-editor"],
  timefield: ["agenda"],
  toast: ["action-bar"],
  togglebutton: ["emoji-reaction-button", "segment"],
  togglebuttongroup: ["segment", "radio-button-group", "checkbox-button-group"],
  toolbar: ["action-bar", "rich-text-editor"],
  tooltip: ["hover-card", "chart-tooltip"],
  typography: ["markdown", "code-block", "text-shimmer"],
};

const normalize = (name: string) => name.toLowerCase().replace(/[-_\s]/g, "");

/** Up to three free and three Pro (React) components related to `component`. */
export async function getRelatedComponentItems(
  component: string,
): Promise<{free: CatalogItem[]; pro: CatalogItem[]}> {
  const free = getRelatedComponents(component)
    .slice(0, MAX_RELATED)
    .map((info): CatalogItem => ({
      description: info.description,
      href: info.href,
      media: getFreeMedia("react", info.name, info.title),
      name: info.name,
      pro: false,
      title: info.title,
    }));

  const proNames = PRO_RELATED_COMPONENTS[normalize(component)] ?? [];

  if (proNames.length === 0) return {free, pro: []};

  const proByName = new Map(
    (await getProCatalog()).react.flatMap((category) =>
      category.components.map((proComponent) => [proComponent.name, proComponent] as const),
    ),
  );

  const pro = proNames
    .flatMap((name) => {
      const proComponent = proByName.get(name);

      if (!proComponent) return [];

      return [
        {
          description: proComponent.description,
          href: getProComponentUrl(proComponent.href, "related_components"),
          media: proComponent.media,
          name: proComponent.name,
          pro: true,
          title: toComponentName(proComponent.title),
        } satisfies CatalogItem,
      ];
    })
    .slice(0, MAX_RELATED);

  return {free, pro};
}
