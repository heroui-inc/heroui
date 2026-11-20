import type {ThemeRegistration} from "shiki";

interface Palette {
  base: string;
  comment: string;
  keyword: string;
  string: string;
  fn: string;
  tag: string;
  bg: string;
}

/** Muted docs theme: neutral text, with color kept for keywords, strings, functions and tags. */
function createTheme(name: string, type: "light" | "dark", c: Palette): ThemeRegistration {
  return {
    bg: c.bg,
    colors: {"editor.background": c.bg, "editor.foreground": c.base},
    fg: c.base,
    name,
    settings: [
      {settings: {background: c.bg, foreground: c.base}},
      {scope: ["comment", "punctuation.definition.comment"], settings: {foreground: c.comment}},
      {
        scope: [
          "keyword",
          "storage",
          "storage.type",
          "storage.modifier",
          "keyword.control",
          "keyword.operator.new",
          "keyword.operator.expression",
          "variable.language.this",
        ],
        settings: {foreground: c.keyword},
      },
      {
        scope: [
          "string",
          "string.quoted",
          "string.template",
          "punctuation.definition.string",
          "constant.numeric",
          "constant.language",
          "constant.character",
          "support.constant",
        ],
        settings: {foreground: c.string},
      },
      {
        scope: [
          "entity.name.function",
          "support.function",
          "meta.function-call entity.name.function",
          "entity.other.attribute-name",
          "variable.function",
        ],
        settings: {foreground: c.fn},
      },
      {
        scope: [
          "entity.name.tag",
          "support.class.component",
          "entity.name.type",
          "entity.name.class",
          "support.type",
          "support.class",
        ],
        settings: {foreground: c.tag},
      },
      {
        scope: ["punctuation", "meta.brace", "keyword.operator", "variable", "meta.jsx.children"],
        settings: {foreground: c.base},
      },
      // CSS
      {
        scope: ["support.type.property-name", "entity.other.attribute-name.class.css"],
        settings: {foreground: c.fn},
      },
      {
        scope: ["support.constant.property-value", "keyword.other.unit"],
        settings: {foreground: c.string},
      },
      // Markdown
      {scope: ["markup.heading", "entity.name.section"], settings: {foreground: c.tag}},
      {scope: ["markup.inline.raw", "markup.fenced_code"], settings: {foreground: c.string}},
    ],
    type,
  };
}

export const docsDarkTheme = createTheme("heroui-docs-dark", "dark", {
  base: "#A1A1AA",
  bg: "#0E0E10",
  comment: "#5C5C66",
  fn: "#C4B5FD",
  keyword: "#F38BA8",
  string: "#7CC4FF",
  tag: "#FAFAFA",
});

export const docsLightTheme = createTheme("heroui-docs-light", "light", {
  base: "#52525B",
  bg: "#FBFBFB",
  comment: "#A1A1AA",
  fn: "#7C3AED",
  keyword: "#D6336C",
  string: "#0369A1",
  tag: "#18181B",
});

/**
 * Shiki options for docs code. `defaultColor: false` emits only `--shiki-light` /
 * `--shiki-dark` variables, which fumadocs' CSS switches on `.dark`; fumadocs
 * sets it for its default themes but not for custom ones.
 */
export const docsShikiOptions = {
  defaultColor: false,
  themes: {dark: docsDarkTheme, light: docsLightTheme},
} as const;
