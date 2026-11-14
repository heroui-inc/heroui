import type {AgentItem} from "./types";

import {
  click,
  clip,
  fire,
  fold,
  inDocumentOrder,
  isAgentHidden,
  isInternal,
  isRendered,
  isSecret,
  labelOf,
  pressKey,
  referenced,
  rootLabelOf,
  setNativeValue,
  settle,
  textOf,
  typeInto,
  typeSegment,
  waitFor,
} from "./dom";
import {registeredComponents} from "./registry";

/** An error whose message is written for the agent to read and act on. */
export class AgentError extends Error {
  override name = "AgentError";
}

type Action = (...args: unknown[]) => unknown;

/** One component found on the page, with what the bridge needs to read and drive it. */
export interface Found {
  /** The element that identifies the component and carries its refs and marks. */
  el: Element;
  kind: string;
  /** 0: fields and composites. 1: buttons. 2: links and status text. Used when capping. */
  rank: 0 | 1 | 2;
  label?: string;
  secret?: boolean;
  /** The value is always one of `items`. */
  closed?: boolean;
  note?: string;
  state: () => Record<string, unknown>;
  items?: () => AgentItem[];
  actions: () => Record<string, Action>;
}

/* -------------------------------------------------------------------------------------------------
 * Helpers
 * -----------------------------------------------------------------------------------------------*/
const MAX_LISTED = 20;

export const listItems = (items: AgentItem[]): string => {
  if (items.length === 0) return "nothing";

  const labels = items.slice(0, MAX_LISTED).map((item) => item.label || item.value);
  const rest = items.length - labels.length;

  return rest > 0 ? `${labels.join(", ")}, and ${rest} more` : labels.join(", ");
};

/** Resolves an argument to one of a list's items, by exact value or by label. */
export const pickItem = (items: AgentItem[], arg: unknown, name: string): AgentItem => {
  const text = String(arg);
  const byValue = items.find((item) => item.value === text);

  if (byValue) return byValue;

  const matches = items.filter((item) => fold(item.label) === fold(text));

  if (matches.length > 1) {
    throw new AgentError(
      `"${text}" names ${matches.length} items in ${name}. Use a value: ${matches
        .map((item) => item.value)
        .join(", ")}.`,
    );
  }

  const [match] = matches;

  if (!match) throw new AgentError(`No item "${text}" in ${name}. Its items: ${listItems(items)}.`);
  if (match.disabled) throw new AgentError(`"${match.label}" is disabled in ${name}.`);

  return match;
};

const isExpanded = (element: Element) => element.getAttribute("aria-expanded") === "true";

const optionItem = (option: Element): AgentItem => {
  const label = textOf(option) || labelOf(option) || "";
  const item: AgentItem = {label, value: option.getAttribute("data-key") ?? label};

  if (option.getAttribute("aria-disabled") === "true") item.disabled = true;

  return item;
};

/** Opens a popup from its trigger, presses the item with the given text, and reports a miss. */
const pressInPopup = async (
  trigger: Element,
  text: string,
  selector: string,
  name: string,
): Promise<void> => {
  const wasOpen = isExpanded(trigger);

  if (!wasOpen) click(trigger);

  const popup = await waitFor(() => referenced(trigger, "aria-controls")[0]);
  const read = () => (popup ? Array.from(popup.querySelectorAll(selector)) : []);
  const matches = (option: Element) =>
    option.getAttribute("data-key") === text || fold(textOf(option)) === fold(text);
  const option = await waitFor(() => read().find(matches), 600);

  if (!option || option.getAttribute("aria-disabled") === "true") {
    const seen = read().map(optionItem);

    if (!wasOpen && popup) pressKey(popup, "Escape");
    await settle();

    throw new AgentError(
      option
        ? `"${text}" is disabled in ${name}.`
        : `No item "${text}" in ${name}. Its items: ${listItems(seen)}.`,
    );
  }

  click(option);
  await settle();
};

const toNumber = (arg: unknown): number => {
  if (typeof arg === "number") return arg;
  if (typeof arg === "string") return Number.parseFloat(arg);

  return Number.NaN;
};

const toBoolean = (arg: unknown, name: string): boolean => {
  if (typeof arg !== "boolean") throw new AgentError(`${name} takes true or false.`);

  return arg;
};

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const ISO_DATE_TIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/;

const FIELD_KINDS: Record<string, string> = {
  "color-field": "color-field",
  "input-otp": "input-otp",
  "number-field": "number-field",
  "search-field": "search-field",
  textfield: "text-field",
};

const FIELD_ROOTS = Object.keys(FIELD_KINDS)
  .map((slot) => `[data-slot="${slot}"]`)
  .join(", ");

const DIALOG_KINDS: Record<string, string> = {
  "alert-dialog-dialog": "alert-dialog",
  "drawer-dialog": "drawer",
  "modal-dialog": "modal",
  "popover-dialog": "popover",
  "sheet-dialog": "sheet",
  toast: "toast",
};

/* -------------------------------------------------------------------------------------------------
 * Date and time segments
 * -----------------------------------------------------------------------------------------------*/
const SEGMENT = '[role="spinbutton"][data-type]';
const SEGMENT_ROOTS =
  '[data-slot="time-field"], [data-slot="date-range-picker"], [data-slot="date-field"], [data-slot="date-picker"]';

const segmentsOf = (container: Element): Map<string, HTMLElement> =>
  new Map(
    Array.from(container.querySelectorAll<HTMLElement>(SEGMENT), (segment) => [
      segment.getAttribute("data-type") ?? "",
      segment,
    ]),
  );

const segmentNumber = (segment: Element | undefined): number | undefined => {
  const raw = segment?.getAttribute("aria-valuenow");

  return raw === null || raw === undefined || raw === "" ? undefined : Number(raw);
};

const pad = (value: number, length = 2): string => String(value).padStart(length, "0");

/** Reads a segmented field as ISO text (`2026-01-31`, `09:30`, or both joined by `T`). */
const readSegments = (container: Element | undefined): string | null => {
  if (!container) return null;

  const segments = segmentsOf(container);
  const read = (type: string) => segmentNumber(segments.get(type));
  const out: string[] = [];

  if (segments.has("year")) {
    const [year, month, day] = [read("year"), read("month"), read("day")];

    if (year === undefined || month === undefined || day === undefined) return null;
    out.push(`${pad(year, 4)}-${pad(month)}-${pad(day)}`);
  }

  if (segments.has("hour")) {
    const [hour, minute] = [read("hour"), read("minute")];

    if (hour === undefined || (segments.has("minute") && minute === undefined)) return null;

    // With an AM/PM segment the hour reads 1-12.
    const hour24 = segments.has("dayPeriod")
      ? (hour % 12) + (read("dayPeriod") === 1 ? 12 : 0)
      : hour;
    const seconds = segments.has("second") ? `:${pad(read("second") ?? 0)}` : "";

    out.push(`${pad(hour24)}:${pad(minute ?? 0)}${seconds}`);
  }

  return out.join("T") || null;
};

/** Types ISO text into a segmented field, then checks that the field took it. */
const writeSegments = async (container: Element, text: string, name: string): Promise<void> => {
  const segments = segmentsOf(container);
  const wantsDate = segments.has("year");
  const wantsTime = segments.has("hour");
  const [dateText, timeText] = text.includes("T")
    ? text.split("T")
    : wantsDate
      ? [text, undefined]
      : [undefined, text];
  const date = dateText?.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const time = timeText?.match(/^(\d{2}):(\d{2})(?::(\d{2}))?$/);

  if (wantsDate !== Boolean(date) || wantsTime !== Boolean(time)) {
    const kind = wantsDate && wantsTime ? "a date and time" : wantsDate ? "a date" : "a time";
    const example = [wantsDate ? "2026-01-31" : "", wantsTime ? "09:30" : ""]
      .filter(Boolean)
      .join("T");

    throw new AgentError(`${name} takes ${kind} such as ${example}.`);
  }

  const type = async (kind: string, value: number) => {
    const segment = segments.get(kind);

    if (segment) await typeSegment(segment, String(value));
  };
  const expected: string[] = [];

  if (date) {
    // Year and month first: they decide how many days the day segment accepts.
    await type("year", Number(date[1]));
    await type("month", Number(date[2]));
    await type("day", Number(date[3]));
    expected.push(date[0]);
  }

  if (time) {
    const hour = Number(time[1]);
    const period = segments.get("dayPeriod");

    await type("hour", period ? hour % 12 || 12 : hour);

    for (let tries = 0; period && tries < 2; tries++) {
      if (segmentNumber(period) === (hour >= 12 ? 1 : 0)) break;
      period.focus();
      pressKey(period, "ArrowUp");
      await settle();
    }

    await type("minute", Number(time[2]));
    if (segments.has("second")) await type("second", Number(time[3] ?? 0));
    expected.push(`${time[1]}:${time[2]}${segments.has("second") ? `:${time[3] ?? "00"}` : ""}`);
  }

  if (readSegments(container) !== expected.join("T")) {
    throw new AgentError(`${name} didn't take ${text}. It may be outside what the field allows.`);
  }
};

const SKIPPED_INPUT_TYPES = new Set([
  "button",
  "checkbox",
  "color",
  "file",
  "hidden",
  "image",
  "radio",
  "range",
  "reset",
  "submit",
]);

/* -------------------------------------------------------------------------------------------------
 * Discovery
 * -----------------------------------------------------------------------------------------------*/

/**
 * Finds the components under `root`. HeroUI components render the semantics the bridge
 * relies on (roles, labels, `data-slot`, and the hidden native controls React Aria keeps
 * for forms), so they are read from the page. Custom components join through the registry.
 */
export const discover = (root: ParentNode): Found[] => {
  const found: Found[] = [];
  const claimed = new Set<Element>();
  const owned: Element[] = [];

  const all = <T extends Element>(selector: string): T[] =>
    Array.from(root.querySelectorAll<T>(selector));

  const free = (element: Element): boolean =>
    !claimed.has(element) &&
    !isInternal(element) &&
    !isAgentHidden(element) &&
    !owned.some((owner) => owner !== element && owner.contains(element)) &&
    isRendered(element);

  const claim = (elements: Iterable<Element | null | undefined>) => {
    for (const element of elements) if (element) claimed.add(element);
  };

  const add = (entry: Found, claims: Iterable<Element | null | undefined> = []) => {
    found.push(entry);
    claimed.add(entry.el);
    claim(claims);
  };

  /* Custom components ------------------------------------------------------------------------- */
  for (const [element, read] of registeredComponents()) {
    if (!root.contains(element) || isAgentHidden(element) || !isRendered(element)) continue;

    const options = read();

    if (!options.exposeChildren) owned.push(element);
    if (options.shown && !options.shown()) {
      claimed.add(element);
      continue;
    }

    add({
      actions: () => (options.actions ?? {}) as Record<string, Action>,
      closed: options.closed,
      el: element,
      items: options.items,
      kind: options.component,
      label: options.label,
      rank: 0,
      secret: options.secret,
      state: () => options.state?.() ?? {},
    });
  }

  /* Select: React Aria keeps a hidden native <select> with every option ------------------------ */
  for (const select of all<HTMLSelectElement>('[data-testid="hidden-select-container"] select')) {
    const container = select.closest('[data-testid="hidden-select-container"]');
    const selectRoot = container?.parentElement;

    if (!selectRoot) continue;

    const trigger = selectRoot.querySelector('button[aria-haspopup="listbox"]') ?? selectRoot;

    if (!free(trigger)) continue;

    const items = () =>
      Array.from(select.options)
        .filter((option) => option.value !== "")
        .map((option) => ({label: clip(option.textContent ?? ""), value: option.value}));
    const clearButton = selectRoot.querySelector('[data-slot$="clear-button"]');

    add(
      {
        actions: () => {
          const actions: Record<string, Action> = {
            setValue: (...args) => {
              const values = args.flat().map(String);

              if (select.multiple) {
                for (const option of Array.from(select.options)) {
                  option.selected = values.includes(option.value);
                }
              } else {
                setNativeValue(select, values[0] ?? "");
              }
              fire(select, "change");
            },
          };

          if (clearButton && isRendered(clearButton)) actions["clear"] = () => click(clearButton);

          return actions;
        },
        closed: true,
        el: trigger,
        items,
        kind: selectRoot.getAttribute("data-slot") ?? "select",
        label: labelOf(trigger) ?? rootLabelOf(selectRoot),
        rank: 0,
        state: () => ({
          multiple: select.multiple || undefined,
          open: isExpanded(trigger),
          value: select.multiple
            ? Array.from(select.selectedOptions, (option) => option.value)
            : select.value || null,
        }),
      },
      [
        ...Array.from(selectRoot.querySelectorAll("button")),
        ...referenced(trigger, "aria-controls"),
      ],
    );
  }

  /* Date fields and pickers: React Aria keeps a hidden native date input ----------------------- */
  const dateRoots = new Map<Element, HTMLInputElement[]>();

  for (const input of all<HTMLInputElement>('[data-testid="hidden-dateinput-container"] input')) {
    const dateRoot = input.closest(
      '[data-testid="hidden-dateinput-container"]',
    )?.previousElementSibling;

    if (dateRoot) dateRoots.set(dateRoot, [...(dateRoots.get(dateRoot) ?? []), input]);
  }

  for (const [dateRoot, inputs] of dateRoots) {
    const group = dateRoot.querySelector('[role="group"]') ?? dateRoot;

    if (!free(group)) continue;

    const name = () => rootLabelOf(group) ?? rootLabelOf(dateRoot) ?? "This field";
    const write = (input: HTMLInputElement | undefined, arg: unknown) => {
      if (!input) return;

      const text = String(arg ?? "");
      const pattern = input.type === "date" ? ISO_DATE : ISO_DATE_TIME;

      if (text && !pattern.test(text)) {
        throw new AgentError(
          `${name()} takes ${
            input.type === "date"
              ? "a date such as 2026-01-31"
              : "a date and time such as 2026-01-31T09:30"
          }.`,
        );
      }
      setNativeValue(input, text);
      fire(input, "input");
      fire(input, "change");
    };

    add(
      {
        actions: () => ({
          setValue: (...args) => {
            const [first, second] = args;

            if (inputs.length === 1) return write(inputs[0], first);

            const range = (first ?? {}) as {end?: unknown; start?: unknown};

            write(inputs[0], typeof first === "object" ? range.start : first);
            write(inputs[1], typeof first === "object" ? range.end : second);
          },
        }),
        el: group,
        kind: dateRoot.getAttribute("data-slot") ?? "date-field",
        label: rootLabelOf(group) ?? rootLabelOf(dateRoot),
        rank: 0,
        state: () => ({
          value:
            inputs.length === 1
              ? inputs[0]?.value || null
              : {end: inputs[1]?.value || null, start: inputs[0]?.value || null},
        }),
      },
      [dateRoot, ...Array.from(dateRoot.querySelectorAll('button, [role="group"]'))],
    );
  }

  /* Date ranges and time fields have no native twin, so they are typed segment by segment ------ */
  for (const fieldRoot of all(SEGMENT_ROOTS)) {
    const group = fieldRoot.querySelector('[role="group"]') ?? fieldRoot;

    if (!free(group) || !fieldRoot.querySelector(SEGMENT)) continue;

    const parts = Array.from(fieldRoot.querySelectorAll('[data-slot="date-input-group-input"]'));
    const inputs = parts.length > 0 ? parts : [group];
    const name = () => rootLabelOf(group) ?? rootLabelOf(fieldRoot) ?? "This field";

    add(
      {
        actions: () => ({
          setValue: async (...args) => {
            const [first, second] = args;
            const active = group.ownerDocument.activeElement as HTMLElement | null;
            const range = (first ?? {}) as {end?: unknown; start?: unknown};
            const values =
              inputs.length === 1
                ? [first]
                : typeof first === "object"
                  ? [range.start, range.end]
                  : [first, second];

            for (const [index, input] of inputs.entries()) {
              await writeSegments(input, String(values[index] ?? ""), name());
            }

            // Leaving the field lets it commit and validate, as it does for a person.
            if (active && active !== group.ownerDocument.body && !group.contains(active)) {
              active.focus();
            } else {
              (group.ownerDocument.activeElement as HTMLElement | null)?.blur();
            }
          },
        }),
        el: group,
        kind: fieldRoot.getAttribute("data-slot") ?? "date-field",
        label: rootLabelOf(group) ?? rootLabelOf(fieldRoot),
        rank: 0,
        state: () => ({
          value:
            inputs.length === 1
              ? readSegments(inputs[0])
              : {end: readSegments(inputs[1]), start: readSegments(inputs[0])},
        }),
      },
      [fieldRoot, ...Array.from(fieldRoot.querySelectorAll('button, [role="group"]'))],
    );
  }

  /* Combo boxes ------------------------------------------------------------------------------- */
  for (const input of all<HTMLInputElement>('input[role="combobox"]')) {
    if (!free(input)) continue;

    const comboRoot = input.closest('[data-slot="combo-box"], [data-slot="autocomplete"]');
    const options = () =>
      referenced(input, "aria-controls").flatMap((list) =>
        Array.from(list.querySelectorAll('[role="option"]')),
      );
    const name = () => labelOf(input) ?? "this list";

    add(
      {
        actions: () => ({
          clear: () => typeInto(input, ""),
          setValue: async (arg) => {
            const text = String(arg ?? "");

            typeInto(input, text, {blur: false});

            const option = text
              ? await waitFor(
                  () =>
                    options().find(
                      (candidate) =>
                        candidate.getAttribute("data-key") === text ||
                        fold(textOf(candidate)) === fold(text),
                    ),
                  600,
                )
              : undefined;
            const seen = options().map(optionItem);

            if (option) click(option);
            await settle();
            input.blur();
            await settle();

            if (!option && fold(input.value) !== fold(text)) {
              throw new AgentError(
                seen.length > 0
                  ? `No item "${text}" in ${name()}. Matching items: ${listItems(seen)}.`
                  : `No item "${text}" in ${name()}.`,
              );
            }
          },
        }),
        el: input,
        items: () => options().map(optionItem),
        kind: comboRoot?.getAttribute("data-slot") ?? "combo-box",
        note: "setValue takes an item's label and opens the list to find it.",
        rank: 0,
        state: () => ({open: isExpanded(input), value: input.value}),
      },
      [
        ...Array.from(comboRoot?.querySelectorAll('button[aria-haspopup="listbox"]') ?? []),
        ...referenced(input, "aria-controls"),
      ],
    );
  }

  /* Selects too large for a native twin: found by their trigger -------------------------------- */
  for (const trigger of all('button[aria-haspopup="listbox"]')) {
    if (!free(trigger)) continue;

    const name = () => labelOf(trigger) ?? "this list";

    add(
      {
        actions: () => ({
          setValue: (arg) => pressInPopup(trigger, String(arg), '[role="option"]', name()),
        }),
        el: trigger,
        items: () =>
          referenced(trigger, "aria-controls").flatMap((list) =>
            Array.from(list.querySelectorAll('[role="option"]'), optionItem),
          ),
        kind: "select",
        note: "setValue takes an item's label and opens the list to find it.",
        rank: 0,
        state: () => ({
          open: isExpanded(trigger),
          value: textOf(trigger.querySelector('[data-slot$="value"]') ?? trigger) || null,
        }),
      },
      referenced(trigger, "aria-controls"),
    );
  }

  /* Native selects ---------------------------------------------------------------------------- */
  for (const select of all<HTMLSelectElement>("select")) {
    if (!free(select)) continue;

    add({
      actions: () => ({
        setValue: (...args) => {
          const values = args.flat().map(String);

          if (select.multiple) {
            for (const option of Array.from(select.options)) {
              option.selected = values.includes(option.value);
            }
          } else {
            setNativeValue(select, values[0] ?? "");
          }
          fire(select, "input");
          fire(select, "change");
        },
      }),
      closed: true,
      el: select,
      items: () =>
        Array.from(select.options, (option) => ({
          label: clip(option.textContent ?? ""),
          value: option.value,
          ...(option.disabled ? {disabled: true} : {}),
        })),
      kind: "select",
      rank: 0,
      state: () => ({
        multiple: select.multiple || undefined,
        value: select.multiple
          ? Array.from(select.selectedOptions, (option) => option.value)
          : select.value,
      }),
    });
  }

  /* Radio groups ------------------------------------------------------------------------------ */
  for (const group of all('[role="radiogroup"]')) {
    if (!free(group)) continue;

    const radios = () =>
      Array.from(group.querySelectorAll<HTMLElement>('input[type="radio"], [role="radio"]'));
    const valueOf = (radio: Element) =>
      (radio as HTMLInputElement).value ?? radio.getAttribute("data-key") ?? labelOf(radio) ?? "";
    const isChecked = (radio: Element) =>
      radio.tagName === "INPUT"
        ? (radio as HTMLInputElement).checked
        : radio.getAttribute("aria-checked") === "true";

    add(
      {
        actions: () => ({
          setValue: (arg) => {
            const radio = radios().find((candidate) => valueOf(candidate) === String(arg));

            if (radio && !isChecked(radio)) click(radio);
          },
        }),
        closed: true,
        el: group,
        items: () =>
          radios().map((radio) => ({
            label: labelOf(radio) ?? valueOf(radio),
            value: valueOf(radio),
            ...((radio as HTMLInputElement).disabled ? {disabled: true} : {}),
          })),
        kind: "radio-group",
        label: rootLabelOf(group),
        rank: 0,
        state: () => {
          const checked = radios().find(isChecked);

          return {value: checked ? valueOf(checked) : null};
        },
      },
      radios(),
    );
  }

  /* Sliders ----------------------------------------------------------------------------------- */
  for (const input of all<HTMLInputElement>('input[type="range"]')) {
    if (!free(input)) continue;

    const sliderRoot = input.closest('[data-slot="slider"], [data-slot="color-slider"]');
    const bound = (attribute: "max" | "min" | "step") =>
      input[attribute] === "" ? undefined : Number(input[attribute]);

    add({
      actions: () => ({
        setValue: (arg) => {
          const value = toNumber(arg);
          const min = bound("min") ?? 0;
          const max = bound("max") ?? 100;

          if (Number.isNaN(value) || value < min || value > max) {
            throw new AgentError(
              `${labelOf(input) ?? "This slider"} takes a number from ${min} to ${max}.`,
            );
          }
          setNativeValue(input, String(value));
          fire(input, "input");
          fire(input, "change");
        },
      }),
      el: input,
      kind: sliderRoot?.getAttribute("data-slot") ?? "slider",
      rank: 0,
      state: () => ({
        max: bound("max"),
        min: bound("min"),
        step: bound("step"),
        value: Number(input.value),
      }),
    });
  }

  /* Checkboxes, switches, and lone radios ------------------------------------------------------ */
  for (const control of all<HTMLElement>(
    'input[type="checkbox"], input[type="radio"], [role="checkbox"], [role="switch"], [role="radio"]',
  )) {
    if (!free(control)) continue;

    const native = control.tagName === "INPUT" ? (control as HTMLInputElement) : null;
    const role = control.getAttribute("role");
    const isRadio = native?.type === "radio" || role === "radio";
    const read = (): boolean | "mixed" => {
      if (native) return native.indeterminate ? "mixed" : native.checked;

      const state = control.getAttribute("aria-checked");

      return state === "mixed" ? "mixed" : state === "true";
    };
    const name = () => labelOf(control) ?? "This control";

    add({
      actions: () => ({
        setChecked: (arg) => {
          const next = toBoolean(arg, name());

          if (isRadio && !next) throw new AgentError(`${name()} is a radio. Choose another one.`);
          if (read() !== next) click(control);
        },
        ...(isRadio ? {} : {toggle: () => click(control)}),
      }),
      el: control,
      kind: role === "switch" ? "switch" : isRadio ? "radio" : "checkbox",
      rank: 0,
      state: () => ({checked: read()}),
    });
  }

  /* Text controls ----------------------------------------------------------------------------- */
  for (const control of all<HTMLInputElement | HTMLTextAreaElement>("input, textarea")) {
    if (control.tagName === "INPUT" && SKIPPED_INPUT_TYPES.has(control.type)) continue;
    if (control.hasAttribute("hidden") || !free(control)) continue;

    const fieldRoot = control.closest(FIELD_ROOTS);
    const slot = fieldRoot?.getAttribute("data-slot");
    const kind =
      (slot ? FIELD_KINDS[slot] : undefined) ??
      (control.tagName === "TEXTAREA"
        ? "textarea"
        : control.type === "search"
          ? "search-field"
          : "input");

    add(
      {
        actions: (): Record<string, Action> =>
          control.readOnly
            ? {}
            : {
                clear: () => typeInto(control, ""),
                setValue: (arg) => typeInto(control, String(arg ?? "")),
              },
        el: control,
        kind,
        rank: 0,
        secret: isSecret(control),
        state: () => ({
          placeholder: control.placeholder || undefined,
          readOnly: control.readOnly || undefined,
          value: control.value,
        }),
      },
      kind === "number-field" || kind === "search-field"
        ? Array.from(fieldRoot?.querySelectorAll("button") ?? [])
        : [],
    );
  }

  /* Tabs -------------------------------------------------------------------------------------- */
  for (const list of all('[role="tablist"]')) {
    if (!free(list)) continue;

    const tabs = () => Array.from(list.querySelectorAll('[role="tab"]'));
    const valueOf = (tab: Element) => tab.getAttribute("data-key") ?? textOf(tab);

    add(
      {
        actions: () => ({
          setValue: (arg) => {
            const tab = tabs().find((candidate) => valueOf(candidate) === String(arg));

            if (tab && tab.getAttribute("aria-selected") !== "true") click(tab);
          },
        }),
        closed: true,
        el: list,
        items: () =>
          tabs().map((tab) => ({
            label: textOf(tab) || valueOf(tab),
            value: valueOf(tab),
            ...(tab.getAttribute("aria-disabled") === "true" ? {disabled: true} : {}),
          })),
        kind: "tabs",
        rank: 0,
        state: () => {
          const selected = tabs().find((tab) => tab.getAttribute("aria-selected") === "true");

          return {value: selected ? valueOf(selected) : null};
        },
      },
      [
        ...tabs(),
        ...Array.from(
          list.closest('[data-slot="tabs-list-container"]')?.querySelectorAll("button") ?? [],
        ),
      ],
    );
  }

  /* Menus opened from a trigger --------------------------------------------------------------- */
  for (const trigger of all(
    'button[aria-haspopup="true"], button[aria-haspopup="menu"], [role="button"][aria-haspopup="menu"]',
  )) {
    if (!free(trigger)) continue;

    const menuItems = () =>
      referenced(trigger, "aria-controls").flatMap((menu) =>
        Array.from(menu.querySelectorAll('[role^="menuitem"]')),
      );
    const name = () => labelOf(trigger) ?? "this menu";

    add(
      {
        actions: () => ({
          press: (arg) =>
            arg === undefined
              ? click(trigger)
              : pressInPopup(trigger, String(arg), '[role^="menuitem"]', name()),
          setOpen: (arg) => {
            if (isExpanded(trigger) !== toBoolean(arg, name())) click(trigger);
          },
        }),
        el: trigger,
        items: () => menuItems().map(optionItem),
        kind: "menu",
        note: "press takes an item's label and opens the menu to find it.",
        rank: 1,
        state: () => ({open: isExpanded(trigger)}),
      },
      referenced(trigger, "aria-controls"),
    );
  }

  /* Dialogs, drawers, popovers, and toasts that are open --------------------------------------- */
  for (const dialog of all('[role="dialog"], [role="alertdialog"]')) {
    if (!free(dialog)) continue;

    const slot = dialog.getAttribute("data-slot") ?? "";

    add({
      actions: () => ({
        close: async () => {
          const closer = dialog.querySelector(
            '[data-slot$="close-trigger"], [data-slot="toast-close"]',
          );
          const gone = () => !isRendered(dialog);

          if (slot === "toast" && closer) click(closer);
          else pressKey(dialog, "Escape");

          if (!(await waitFor(gone, 250)) && closer) {
            click(closer);
            await waitFor(gone, 250);
          }

          if (!gone()) {
            throw new AgentError(
              `${labelOf(dialog) ?? "This dialog"} can't be dismissed. Press one of its buttons.`,
            );
          }
        },
      }),
      el: dialog,
      kind: DIALOG_KINDS[slot] ?? dialog.getAttribute("role") ?? "dialog",
      label:
        labelOf(dialog) ??
        (textOf(
          dialog.querySelector(
            '[data-slot$="heading"], [data-slot$="title"], h1, h2, h3, [role="heading"]',
          ),
        ) ||
          undefined),
      rank: 0,
      state: () => ({open: true, text: textOf(dialog, 240) || undefined}),
    });
  }

  /* Lists and menus that are always on the page ------------------------------------------------ */
  for (const list of all('[role="listbox"]')) {
    if (!free(list)) continue;

    const options = () => Array.from(list.querySelectorAll('[role="option"]'));
    const multiple = list.getAttribute("aria-multiselectable") === "true";
    const isSelected = (option: Element) => option.getAttribute("aria-selected") === "true";

    add({
      actions: () => ({
        setValue: (...args) => {
          const values = args.flat().map(String);

          for (const option of options()) {
            const wanted = values.includes(optionItem(option).value);

            if (wanted !== isSelected(option) && (wanted || multiple)) click(option);
          }
        },
      }),
      closed: true,
      el: list,
      items: () => options().map(optionItem),
      kind: "list-box",
      rank: 0,
      state: () => {
        const selected = options()
          .filter(isSelected)
          .map((option) => optionItem(option).value);

        return {
          multiple: multiple || undefined,
          value: multiple ? selected : (selected[0] ?? null),
        };
      },
    });
  }

  for (const menu of all('[role="menu"]')) {
    if (!free(menu)) continue;

    const menuItems = () => Array.from(menu.querySelectorAll('[role^="menuitem"]'));

    add({
      actions: () => ({
        press: (arg) => {
          const items = menuItems().map(optionItem);
          const target = pickItem(items, arg, labelOf(menu) ?? "this menu");
          const element = menuItems()[items.indexOf(target)];

          if (element) click(element);
        },
      }),
      el: menu,
      items: () => menuItems().map(optionItem),
      kind: "menu",
      rank: 1,
      state: () => ({open: true}),
    });
  }

  /* Buttons: toggles, disclosures, and plain actions ------------------------------------------- */
  for (const button of all<HTMLElement>(
    'button, [role="button"], summary, input[type="button"], input[type="submit"], input[type="reset"]',
  )) {
    if (!free(button)) continue;
    // Calendar days are a grid of buttons; listing each one would bury the rest of the page.
    if (button.closest('[role="gridcell"]')) continue;
    if (!labelOf(button) && button.tabIndex < 0) continue;

    const slot = button.getAttribute("data-slot");
    const name = () => labelOf(button) ?? "This button";

    if (button.hasAttribute("aria-pressed")) {
      const isPressed = () => button.getAttribute("aria-pressed") === "true";

      add({
        actions: () => ({
          press: () => click(button),
          setPressed: (arg) => {
            if (isPressed() !== toBoolean(arg, name())) click(button);
          },
        }),
        el: button,
        kind: "toggle-button",
        rank: 1,
        state: () => ({pressed: isPressed()}),
      });
      continue;
    }

    if (button.hasAttribute("aria-expanded")) {
      add({
        actions: () => ({
          press: () => click(button),
          setOpen: (arg) => {
            if (isExpanded(button) !== toBoolean(arg, name())) click(button);
          },
        }),
        el: button,
        kind:
          slot === "accordion-trigger"
            ? "accordion"
            : slot === "disclosure-trigger"
              ? "disclosure"
              : "button",
        rank: 1,
        state: () => ({open: isExpanded(button)}),
      });
      continue;
    }

    add({
      actions: () => ({press: () => click(button)}),
      el: button,
      kind: "button",
      rank: 1,
      state: () => ({}),
    });
  }

  /* Links ------------------------------------------------------------------------------------- */
  for (const link of all<HTMLAnchorElement>("a[href]")) {
    if (!free(link)) continue;

    add({
      actions: () => ({press: () => click(link)}),
      el: link,
      kind: "link",
      rank: 2,
      state: () => ({href: link.getAttribute("href") ?? undefined}),
    });
  }

  /* Alerts and status messages ---------------------------------------------------------------- */
  for (const message of all('[role="alert"], [role="status"]')) {
    if (!free(message) || message.closest("[data-live-announcer]")) continue;

    const text = textOf(message, 240);

    if (!text) continue;

    add({
      actions: () => ({}),
      el: message,
      kind: message.getAttribute("role") === "alert" ? "alert" : "status",
      rank: 2,
      state: () => ({text: textOf(message, 240) || undefined}),
    });
  }

  return found.sort((a, b) => inDocumentOrder(a.el, b.el));
};
