/**
 * Prop controls for docs demos (the sliders panel next to a preview).
 *
 * A controlled demo takes the controlled props as its only argument and spreads
 * them onto the element they configure:
 *
 * ```tsx
 * import type {ButtonProps} from "@heroui/react";
 *
 * import {Button} from "@heroui/react";
 *
 * export function Basic(props: ButtonProps) {
 *   return <Button {...props}>Click me</Button>;
 * }
 * ```
 *
 * {@link renderDemoSource} turns that file into the code readers copy: the
 * `props` parameter and its type import are dropped, and `{...props}` becomes the
 * props that differ from their defaults. Shared by the server (first paint) and
 * the client (live updates), so it must stay free of React and Node APIs.
 */

export type DemoControlValue = boolean | string | number | undefined;

export type DemoControlValues = Record<string, DemoControlValue>;

/**
 * An enum's options, or options keyed by another control's value when they depend
 * on it (a color channel on its color space). Plain data, since controls are passed
 * from the server to the panel. A value that stops being an option falls back to
 * the default, see {@link setControlValue}.
 */
type EnumOptions<T extends string = string> =
  readonly T[] | {by: string; options: Readonly<Record<string, readonly T[]>>};

/**
 * An enum without a `default` also offers "Default", which leaves the prop unset so
 * the component decides (`firstDayOfWeek` follows the locale). `required` drops
 * that option for props that must be passed.
 */
type EnumControl<T extends string = string> = {
  type: "enum";
  options: EnumOptions<T>;
  default?: T;
  initial?: T;
  required?: boolean;
  /** Another control whose current value this one can't take (the other axis). */
  distinctFrom?: string;
};

export type DemoControl =
  | {type: "boolean"; default?: boolean; initial?: boolean}
  | EnumControl
  | {type: "string"; default?: string; initial?: string; placeholder?: string}
  | {type: "number"; default?: number; initial?: number; min?: number; max?: number; step?: number};

/** Prop name → control. Insertion order is the panel order. */
export type DemoControls = Record<string, DemoControl>;

type BooleanControl = Extract<DemoControl, {type: "boolean"}>;
type NumberControl = Extract<DemoControl, {type: "number"}>;
type StringControl = Extract<DemoControl, {type: "string"}>;

/** The controls a prop of type `V` can have; enum options must be values of `V`. */
type ControlFor<V> = [Exclude<V, undefined>] extends [boolean]
  ? BooleanControl
  : [Exclude<V, undefined>] extends [number]
    ? NumberControl
    : [Exclude<V, undefined>] extends [string]
      ? StringControl | EnumControl<Extract<Exclude<V, undefined>, string>>
      : never;

type ControlsFor<P> = {[K in keyof P]?: ControlFor<P[K]>};

/**
 * Checks controls against the props of the component they drive, so a misspelled
 * prop, an unknown option or the wrong control type fails type checking:
 *
 * ```ts
 * export const switchControls = defineControls<SwitchProps>()({size: sizes});
 * ```
 */
export const defineControls =
  <P>() =>
  <const C extends ControlsFor<P>>(controls: C & Record<Exclude<keyof C, keyof P>, never>): C =>
    controls;

/** Values the panel starts with. */
export function getInitialControlValues(controls: DemoControls): DemoControlValues {
  return Object.fromEntries(
    Object.entries(controls).map(([name, control]) => [name, control.initial ?? control.default]),
  );
}

/** The options an enum offers for the current values. */
export function getEnumOptions(control: EnumControl, values: DemoControlValues): readonly string[] {
  const {distinctFrom, options} = control;
  const list = "by" in options ? (options.options[String(values[options.by])] ?? []) : options;

  return distinctFrom ? list.filter((option) => option !== values[distinctFrom]) : list;
}

/** Whether an enum offers "Default" (the prop left unset). */
export function isUnsettable(control: EnumControl): boolean {
  return control.default === undefined && !control.required;
}

/**
 * Sets one value, then moves dependent enums whose value is no longer an option
 * back to their default (or unset, or the first option when required).
 */
export function setControlValue(
  controls: DemoControls,
  values: DemoControlValues,
  name: string,
  value: DemoControlValue,
): DemoControlValues {
  const next = {...values, [name]: value};

  for (const [prop, control] of Object.entries(controls)) {
    if (control.type !== "enum") continue;

    const current = next[prop];
    const options = getEnumOptions(control, next);

    if (current === undefined || options.includes(String(current))) continue;

    next[prop] =
      control.default !== undefined && options.includes(control.default)
        ? control.default
        : control.required
          ? options[0]
          : undefined;
  }

  return next;
}

/** The props to render and print: only the ones that differ from their defaults. */
export function getChangedProps(
  controls: DemoControls,
  values: DemoControlValues,
): DemoControlValues {
  const changed: DemoControlValues = {};

  for (const [name, control] of Object.entries(controls)) {
    const value = values[name];
    const fallback = control.type === "boolean" ? (control.default ?? false) : control.default;

    if (value === undefined || value === "" || value === fallback) continue;
    if (control.type === "number" && Number.isNaN(value)) continue;

    changed[name] = value;
  }

  return changed;
}

/** Prettier's default, so the printed tag reads well in the narrow code panel. */
const PRINT_WIDTH = 80;
const PROPS_SPREAD = "{...props}";

/** Builds the readable source for a controlled demo file. */
export function renderDemoSource(
  source: string,
  controls: DemoControls,
  values: DemoControlValues,
): string {
  let code = source.trim();

  // `export function Basic(props: ButtonProps)` → `export function Basic()`
  let propsType: string | undefined;

  code = code.replace(
    /(export\s+(?:default\s+)?function\s+\w+)\(\s*props\s*:\s*([^)]*?)\s*\)/,
    (_, signature: string, type: string) => {
      propsType = type;

      return `${signature}()`;
    },
  );

  const props = formatProps(getChangedProps(controls, values));

  // A demo can spread the props more than once (a row of swatches); each one is replaced.
  while (code.includes(PROPS_SPREAD)) {
    code = insertProps(code, props);
  }

  for (const name of propsType?.match(/[A-Za-z_$][\w$]*/g) ?? []) {
    code = removeUnusedTypeImport(code, name);
  }

  return code.replace(/\n{3,}/g, "\n\n").trim();
}

function formatProp(name: string, value: Exclude<DemoControlValue, undefined>): string {
  if (value === true) return name;
  if (typeof value === "string") {
    return value.includes('"') ? `${name}={${JSON.stringify(value)}}` : `${name}="${value}"`;
  }

  return `${name}={${String(value)}}`;
}

function formatProps(props: DemoControlValues): string[] {
  return Object.entries(props).flatMap(([name, value]) =>
    value === undefined ? [] : [formatProp(name, value)],
  );
}

/** Mirrors the repo's `react/jsx-sort-props`: shorthand first, callbacks and multiline last. */
function compareAttributes(a: string, b: string): number {
  const rank = (attribute: string) => {
    if (attribute.includes("\n")) return 3;
    if (/^on[A-Z]/.test(attribute)) return 2;
    if (!attribute.includes("=")) return 0;

    return 1;
  };

  return (
    rank(a) - rank(b) ||
    attributeName(a).localeCompare(attributeName(b), undefined, {sensitivity: "base"})
  );
}

/** Sorts between spreads only: moving an attribute across a spread changes which value wins. */
function sortAttributes(attributes: string[]): string[] {
  const sorted: string[] = [];
  let run: string[] = [];

  for (const attribute of attributes) {
    if (attribute.startsWith("{...")) {
      sorted.push(...run.sort(compareAttributes), attribute);
      run = [];
    } else {
      run.push(attribute);
    }
  }

  return [...sorted, ...run.sort(compareAttributes)];
}

function attributeName(attribute: string): string {
  return attribute.split("=")[0] ?? attribute;
}

/** Splits JSX attribute text on whitespace that is outside braces and strings. */
function splitAttributes(text: string): string[] {
  const attributes: string[] = [];
  let current = "";
  let depth = 0;
  let quote: string | null = null;

  for (const char of text) {
    if (quote) {
      if (char === quote) quote = null;
    } else if (char === '"' || char === "'" || char === "`") {
      quote = char;
    } else if (char === "{") {
      depth++;
    } else if (char === "}") {
      depth--;
    } else if (/\s/.test(char) && depth === 0) {
      if (current) attributes.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  if (current) attributes.push(current);

  return attributes;
}

/** Index of the `>` (or `/>`) that closes the opening tag, scanning from `start`. */
function findTagEnd(code: string, start: number): number {
  let depth = 0;
  let quote: string | null = null;

  for (let index = start; index < code.length; index++) {
    const char = code[index];

    if (quote) {
      if (char === quote) quote = null;
    } else if (char === '"' || char === "'" || char === "`") {
      quote = char;
    } else if (char === "{") {
      depth++;
    } else if (char === "}") {
      depth--;
    } else if (depth === 0 && (char === ">" || (char === "/" && code[index + 1] === ">"))) {
      return index;
    }
  }

  return -1;
}

/** Replaces the first `{...props}` with the printed props, re-wrapping the tag if it gets too long. */
function insertProps(code: string, props: string[]): string {
  const spreadIndex = code.indexOf(PROPS_SPREAD);

  if (spreadIndex === -1) return code;

  // Nothing changed: keep the file's own formatting.
  if (props.length === 0) {
    return code.slice(0, spreadIndex).trimEnd() + code.slice(spreadIndex + PROPS_SPREAD.length);
  }

  const tagStart = code.lastIndexOf("<", spreadIndex);
  const tagName = /^<([\w.$]+)/.exec(code.slice(tagStart))?.[1];
  const tagEnd = findTagEnd(code, spreadIndex + PROPS_SPREAD.length);

  if (tagStart === -1 || !tagName || tagEnd === -1) {
    return code.replace(PROPS_SPREAD, props.join(" "));
  }

  const merged = sortAttributes(
    splitAttributes(code.slice(tagStart + tagName.length + 1, tagEnd)).flatMap((attribute) =>
      attribute === PROPS_SPREAD ? props : [attribute],
    ),
  );
  const closing = code.startsWith("/>", tagEnd) ? "/>" : ">";
  const afterTag = tagEnd + closing.length;
  const lineStart = code.lastIndexOf("\n", tagStart) + 1;
  const lineEnd = code.indexOf("\n", afterTag) === -1 ? code.length : code.indexOf("\n", afterTag);
  const indent = /^\s*/.exec(code.slice(lineStart))?.[0] ?? "";
  const beforeTag = code.slice(lineStart, tagStart);
  const restOfLine = code.slice(afterTag, lineEnd);

  // `<Tag a b>` on its own line: wrap the attributes when the line overflows.
  if (beforeTag.trim() === "") {
    const tag = formatOpeningTag(tagName, merged, closing, indent, restOfLine.length);

    return code.slice(0, tagStart) + tag + code.slice(afterTag);
  }

  const inline = `<${tagName}${merged.map((attribute) => ` ${attribute}`).join("")}${closing === "/>" ? " />" : ">"}`;
  const fits = beforeTag.length + inline.length + restOfLine.length <= PRINT_WIDTH;
  const children = new RegExp(`^(.*)</${tagName.replace(/[.$]/g, "\\$&")}>;$`).exec(restOfLine);

  // `return <Tag a b>child</Tag>;` that no longer fits: wrap it the way Prettier would.
  if (!fits && beforeTag.trim() === "return" && (children || restOfLine === ";")) {
    const inner = `${indent}  `;
    const lines = [
      `${indent}return (`,
      `${inner}${formatOpeningTag(tagName, merged, closing, inner, 0)}`,
    ];

    if (children) lines.push(`${inner}  ${children[1]}`, `${inner}</${tagName}>`);
    lines.push(`${indent});`);

    return code.slice(0, lineStart) + lines.join("\n") + code.slice(lineEnd);
  }

  return code.slice(0, tagStart) + inline + code.slice(afterTag);
}

/** `<Tag a b>` when it fits at `indent`, otherwise one attribute per line. */
function formatOpeningTag(
  tagName: string,
  attributes: string[],
  closing: string,
  indent: string,
  trailingWidth: number,
): string {
  const end = closing === "/>" ? " />" : ">";
  const inline = `<${tagName}${attributes.map((attribute) => ` ${attribute}`).join("")}${end}`;
  const isMultiline = attributes.some((attribute) => attribute.includes("\n"));

  if (!isMultiline && indent.length + inline.length + trailingWidth <= PRINT_WIDTH) {
    return inline;
  }

  return [
    `<${tagName}`,
    ...attributes.map((attribute) => `${indent}  ${attribute}`),
    `${indent}${closing}`,
  ].join("\n");
}

/** Drops `name` from type-only imports once nothing else references it. */
function removeUnusedTypeImport(code: string, name: string): string {
  const importPattern = /^import\s+(type\s+)?\{([^}]*)\}\s+from\s+(["'][^"']+["']);?\n/gm;
  const withoutImports = code.replace(importPattern, "");

  if (new RegExp(`\\b${name}\\b`).test(withoutImports)) return code;

  return code.replace(
    importPattern,
    (statement, typeOnly: string | undefined, list: string, from) => {
      const specifiers = list
        .split(",")
        .map((specifier) => specifier.trim())
        .filter(Boolean);
      const remaining = specifiers.filter((specifier) => {
        const bare = specifier.replace(/^type\s+/, "");

        return !(bare === name && (typeOnly || specifier.startsWith("type ")));
      });

      if (remaining.length === specifiers.length) return statement;
      if (remaining.length === 0) return "";

      return `import ${typeOnly ?? ""}{${remaining.join(", ")}} from ${from};\n`;
    },
  );
}
