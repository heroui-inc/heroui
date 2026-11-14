import type {AgentSource} from "./types";

/* -------------------------------------------------------------------------------------------------
 * Change source
 * -----------------------------------------------------------------------------------------------*/
let currentSource: AgentSource = "user";

/**
 * Tells whether the change being handled right now was requested by an agent.
 * Read it synchronously inside a change handler such as `onChange` or `onPress`.
 */
export const getChangeSource = (): AgentSource => currentSource;

/** Runs `fn` with the change source set to `"agent"` for its synchronous part. */
export const asAgent = <T>(fn: () => T): T => {
  const previous = currentSource;

  currentSource = "agent";
  try {
    return fn();
  } finally {
    currentSource = previous;
  }
};

/* -------------------------------------------------------------------------------------------------
 * Text
 * -----------------------------------------------------------------------------------------------*/
const MAX_TEXT = 80;

/** Case-, accent-, and whitespace-insensitive form used for every comparison. */
export const fold = (text: string): string =>
  text
    .normalize("NFD")
    .replace(/\p{M}+/gu, "")
    .replace(/ß/g, "ss")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Whether `needle` appears in `haystack` as whole words: "name" is in "Display name", not "Username". */
export const hasWords = (haystack: string | undefined, needle: string): boolean => {
  const target = fold(needle);

  if (!haystack || !target) return false;

  return new RegExp(`(?<![\\p{L}\\p{N}])${escapeRegExp(target)}(?![\\p{L}\\p{N}])`, "u").test(
    fold(haystack),
  );
};

export const clip = (text: string, max = MAX_TEXT): string => {
  const clean = text
    .replace(/[\u00A0\u2066-\u2069]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return clean.length > max ? `${clean.slice(0, max - 1).trimEnd()}…` : clean;
};

const SKIPPED_TEXT_TAGS = new Set(["SVG", "SELECT", "SCRIPT", "STYLE", "TEMPLATE", "OPTION"]);

/** Visible text of a node, skipping decorative and hidden descendants. */
export const textOf = (node: Node | null | undefined, max = MAX_TEXT): string => {
  if (!node) return "";

  const parts: string[] = [];

  const walk = (current: Node) => {
    if (current.nodeType === 3) {
      parts.push(current.nodeValue ?? "");

      return;
    }
    if (current.nodeType !== 1) return;

    const element = current as Element;

    if (SKIPPED_TEXT_TAGS.has(element.tagName.toUpperCase())) return;
    if (element.getAttribute("aria-hidden") === "true" || element.hasAttribute("hidden")) return;

    for (const child of Array.from(element.childNodes)) walk(child);
    parts.push(" ");
  };

  walk(node);

  return clip(parts.join(""), max);
};

/* -------------------------------------------------------------------------------------------------
 * Element facts
 * -----------------------------------------------------------------------------------------------*/
const byId = (element: Element, id: string): Element | null => {
  const root = element.getRootNode() as Document | ShadowRoot;

  return typeof root.getElementById === "function"
    ? root.getElementById(id)
    : element.ownerDocument.getElementById(id);
};

/** Elements referenced by an id-list attribute such as `aria-labelledby`. */
export const referenced = (element: Element, attribute: string): Element[] =>
  (element.getAttribute(attribute) ?? "")
    .split(/\s+/)
    .filter(Boolean)
    .map((id) => byId(element, id))
    .filter((node): node is Element => node !== null);

/** Accessible name of an element, following the order assistive technology uses. */
export const labelOf = (element: Element): string | undefined => {
  const ariaLabel = element.getAttribute("aria-label")?.trim();
  const labelledBy = (element.getAttribute("aria-labelledby") ?? "").split(/\s+/).filter(Boolean);

  if (labelledBy.length > 0) {
    const parts = labelledBy.map((id) => {
      if (id === element.id) return ariaLabel ?? "";

      const node = byId(element, id);

      // The current value (a select's choice or placeholder) is not the control's name.
      if (!node || element.contains(node) || node.matches('[data-slot$="-value"]')) return "";

      return textOf(node);
    });
    const text = clip(parts.filter(Boolean).join(" "));

    if (text) return text;
  }

  if (ariaLabel) return clip(ariaLabel);

  const labels = (element as HTMLInputElement).labels;

  if (labels && labels.length > 0) {
    const text = clip(
      Array.from(labels)
        .map((label) => textOf(label))
        .filter(Boolean)
        .join(" "),
    );

    if (text) return text;
  }

  const tag = element.tagName.toLowerCase();
  const role = element.getAttribute("role");

  if (
    tag === "button" ||
    tag === "a" ||
    tag === "summary" ||
    (role !== null && NAME_FROM_CONTENT_ROLES.has(role))
  ) {
    const text = textOf(element);

    if (text) return text;
  }

  if (tag === "input") {
    const type = (element as HTMLInputElement).type;

    if (type === "submit" || type === "button" || type === "reset") {
      const text = clip((element as HTMLInputElement).value);

      if (text) return text;
    }
  }

  const title = element.getAttribute("title")?.trim();

  return title ? clip(title) : undefined;
};

const NAME_FROM_CONTENT_ROLES = new Set([
  "button",
  "link",
  "tab",
  "option",
  "menuitem",
  "menuitemcheckbox",
  "menuitemradio",
  "radio",
  "checkbox",
  "switch",
]);

/** Label of a compound root: its own name, or the label part it renders. */
export const rootLabelOf = (root: Element): string | undefined => {
  const own = labelOf(root);

  if (own) return own;

  const slot =
    root.querySelector(':scope > [data-slot="label"]') ??
    root.querySelector(":scope > label, :scope > legend");

  return slot ? textOf(slot) || undefined : undefined;
};

const GROUP_SELECTOR =
  '[role="group"], [role="radiogroup"], fieldset, [data-slot="fieldset"], [data-slot="checkbox-group"], [data-slot="switch-group"], [role="toolbar"]';

/** Label of the nearest labelled group around an element. */
export const groupOf = (element: Element, ownLabel?: string): string | undefined => {
  let current = element.parentElement?.closest(GROUP_SELECTOR) ?? null;

  while (current) {
    const label = rootLabelOf(current);

    if (label && label !== ownLabel) return label;
    current = current.parentElement?.closest(GROUP_SELECTOR) ?? null;
  }

  return undefined;
};

const ROW_SELECTOR = 'tr, [role="row"], li, [role="listitem"]';
const ROW_HEADER_SELECTOR = 'th, [role="rowheader"], td, [role="gridcell"], [role="cell"]';

/** Identifying text of the table row or list item around an element. */
export const rowOf = (element: Element, ownLabel?: string): string | undefined => {
  const row = element.parentElement?.closest(ROW_SELECTOR);

  if (!row) return undefined;

  const header = row.querySelector(ROW_HEADER_SELECTOR);
  const text = header && !header.contains(element) ? textOf(header, 60) : "";

  return text && text !== ownLabel ? text : undefined;
};

/** Help and error text connected through `aria-describedby`. */
export const descriptionOf = (element: Element): string | undefined => {
  const text = clip(
    referenced(element, "aria-describedby")
      .filter((node) => !node.id.startsWith("react-aria-description"))
      .map((node) => textOf(node, 160))
      .filter(Boolean)
      .join(" "),
    200,
  );

  return text || undefined;
};

export const isDisabled = (element: Element): boolean =>
  element.matches(":disabled") ||
  element.getAttribute("aria-disabled") === "true" ||
  element.closest('[data-disabled="true"], [aria-disabled="true"], fieldset:disabled') !== null;

/** Whether the element is part of the rendered page. */
export const isRendered = (element: Element): boolean => {
  if (!element.isConnected) return false;
  // Inert content sits behind a modal; exiting content is animating out and already closed.
  if (element.closest("[inert], [data-exiting]")) return false;

  if (typeof element.checkVisibility === "function") {
    return element.checkVisibility({contentVisibilityAuto: true, visibilityProperty: true});
  }

  for (let current: Element | null = element; current; current = current.parentElement) {
    if (current.hasAttribute("hidden")) return false;

    const style = (current as HTMLElement).style;

    if (style?.display === "none" || style?.visibility === "hidden") return false;
  }

  return true;
};

/** Elements React Aria renders for the browser only, such as the hidden select used for autofill. */
export const isInternal = (element: Element): boolean =>
  element.closest("[data-react-aria-prevent-focus]") !== null;

export const isAgentHidden = (element: Element): boolean =>
  element.closest("[data-agent-hidden]") !== null;

export const confirmOf = (element: Element): string | undefined => {
  const marked = element.closest("[data-agent-confirm]");

  if (!marked) return undefined;

  return marked.getAttribute("data-agent-confirm")?.trim() || "This action needs a person";
};

const SECRET_AUTOCOMPLETE = /(^|\s)(cc-[a-z-]+|one-time-code|current-password|new-password)(\s|$)/;

/** Whether a field's value must never reach the agent. */
export const isSecret = (element: Element): boolean => {
  if (element.closest("[data-agent-secret]")) return true;
  if (element.closest('[data-slot="input-otp"], [data-input-otp]')) return true;

  if (element.tagName === "INPUT") {
    const input = element as HTMLInputElement;

    if (input.type === "password") return true;
    if (SECRET_AUTOCOMPLETE.test(input.getAttribute("autocomplete") ?? "")) return true;
  }

  return false;
};

export const REDACTED = "[redacted]";

/* -------------------------------------------------------------------------------------------------
 * Driving the page
 * -----------------------------------------------------------------------------------------------*/
type ValueElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

/** Sets a form control's value the way the browser does, so React notices the change. */
export const setNativeValue = (element: ValueElement, value: string): void => {
  const view = element.ownerDocument.defaultView ?? window;
  const prototype =
    element.tagName === "TEXTAREA"
      ? view.HTMLTextAreaElement.prototype
      : element.tagName === "SELECT"
        ? view.HTMLSelectElement.prototype
        : view.HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(prototype, "value")?.set;

  if (setter) setter.call(element, value);
  else element.value = value;
};

export const fire = (element: Element, type: string): void => {
  const view = element.ownerDocument.defaultView ?? window;

  asAgent(() => element.dispatchEvent(new view.Event(type, {bubbles: true, cancelable: true})));
};

export const click = (element: Element): void => {
  asAgent(() => (element as HTMLElement).click());
};

export const pressKey = (element: Element, key: string): void => {
  const view = element.ownerDocument.defaultView ?? window;

  asAgent(() => {
    element.dispatchEvent(
      new view.KeyboardEvent("keydown", {bubbles: true, cancelable: true, key}),
    );
    element.dispatchEvent(new view.KeyboardEvent("keyup", {bubbles: true, cancelable: true, key}));
  });
};

/**
 * Types into one segment of a React Aria date or time field (the month, the hour, …), one
 * character per tick so the field re-renders between keys as it does for a person.
 */
export const typeSegment = async (segment: HTMLElement, text: string): Promise<void> => {
  const view = segment.ownerDocument.defaultView ?? window;

  // Focusing a segment resets what it has collected, so a stale half-typed number is dropped.
  segment.blur();
  segment.focus();

  for (const data of text) {
    asAgent(() => {
      segment.dispatchEvent(
        new view.InputEvent("beforeinput", {
          bubbles: true,
          cancelable: true,
          data,
          inputType: "insertText",
        }),
      );
    });
    await settle();
  }
};

/**
 * Types a value into a text control: focus, input, change, then blur, so the field's own
 * commit and validation logic runs as it would for a person.
 */
export const typeInto = (
  element: HTMLInputElement | HTMLTextAreaElement,
  value: string,
  options: {blur?: boolean} = {},
): void => {
  const {blur = true} = options;
  const active = element.ownerDocument.activeElement;
  const wasFocused = active === element;

  asAgent(() => {
    if (!wasFocused) element.focus({preventScroll: true});
    setNativeValue(element, value);
  });
  fire(element, "input");
  fire(element, "change");

  if (blur && !wasFocused) {
    asAgent(() => {
      element.blur();
      if (active && active !== element.ownerDocument.body && "focus" in active) {
        (active as HTMLElement).focus({preventScroll: true});
      }
    });
  }
};

/** Lets React and the browser finish the work an event started. */
export const settle = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 0));

/** Waits until `read` returns a value, or gives up after `timeout` milliseconds. */
export const waitFor = async <T>(
  read: () => T | null | undefined | false,
  timeout = 1000,
): Promise<T | undefined> => {
  const deadline = Date.now() + timeout;

  for (;;) {
    const value = read();

    if (value) return value;
    if (Date.now() >= deadline) return undefined;
    await new Promise((resolve) => setTimeout(resolve, 16));
  }
};

/** Sorts elements in document order. */
export const inDocumentOrder = (a: Element, b: Element): number => {
  if (a === b) return 0;

  return a.compareDocumentPosition(b) & 4 ? -1 : 1;
};
