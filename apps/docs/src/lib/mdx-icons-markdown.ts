/**
 * Docs content uses `<StatusCheck>`, `<StatusCross>`, `<StatusWarning>` and
 * `<InlineIcon>` in place of emojis. In the machine-readable markdown, status
 * icons go back to the emoji they replace (their meaning) and decorative inline
 * icons are dropped. Fenced code blocks are left untouched.
 */

const STATUS_EMOJIS: Record<string, string> = {
  StatusCheck: "✅",
  StatusCross: "❌",
  StatusWarning: "⚠️",
};

// `<StatusCheck>Available</StatusCheck>` -> "✅ Available"
const STATUS_WITH_TEXT_REGEX =
  /<(StatusCheck|StatusCross|StatusWarning)\b[^>]*?(?<!\/)>([\s\S]*?)<\/\1>/g;
// `<StatusCheck />` -> "✅"
const STATUS_SELF_CLOSING_REGEX = /<(StatusCheck|StatusCross|StatusWarning)\b[^>]*\/>/g;
// `<InlineIcon icon="globe" /> HeroUI` -> "HeroUI"
const INLINE_ICON_REGEX = /<InlineIcon\b[^>]*\/>[ \t]?/g;
const CODE_FENCE_REGEX = /^([ \t]*)(`{3,}|~{3,})[^\n]*\n(?:[\s\S]*?\n)?\1\2[`~]*[ \t]*$/gm;

function replaceIcons(text: string): string {
  return text
    .replace(
      STATUS_WITH_TEXT_REGEX,
      (_match, name: string, children: string) => `${STATUS_EMOJIS[name]} ${children.trim()}`,
    )
    .replace(STATUS_SELF_CLOSING_REGEX, (_match, name: string) => STATUS_EMOJIS[name] ?? "")
    .replace(INLINE_ICON_REGEX, "");
}

/** String pass over raw MDX, for output that is not parsed by remark. */
export function replaceMdxIcons(content: string): string {
  let result = "";
  let lastIndex = 0;

  for (const match of content.matchAll(CODE_FENCE_REGEX)) {
    result += replaceIcons(content.slice(lastIndex, match.index)) + match[0];
    lastIndex = match.index + match[0].length;
  }

  return result + replaceIcons(content.slice(lastIndex));
}

type MdastNode = {
  children?: MdastNode[];
  name?: string | null;
  type: string;
  value?: string;
};

function isJsxElement(node: MdastNode): boolean {
  return node.type === "mdxJsxTextElement" || node.type === "mdxJsxFlowElement";
}

function replaceIconNodes(parent: MdastNode): void {
  if (!parent.children) return;

  const children: MdastNode[] = [];
  let trimNextText = false;

  for (const child of parent.children) {
    if (isJsxElement(child) && child.name === "InlineIcon") {
      trimNextText = true;
      continue;
    }

    if (isJsxElement(child) && child.name && child.name in STATUS_EMOJIS) {
      const content = child.children ?? [];

      children.push({
        type: "text",
        value: `${STATUS_EMOJIS[child.name]}${content.length > 0 ? " " : ""}`,
      });
      content.forEach(replaceIconNodes);
      children.push(...content);
      trimNextText = false;
      continue;
    }

    if (trimNextText && child.type === "text" && child.value) {
      child.value = child.value.replace(/^[ \t]/, "");
    }
    trimNextText = false;
    replaceIconNodes(child);
    children.push(child);
  }

  parent.children = children;
}

/**
 * Remark plugin with the same mapping, for the parsed tree. It runs after
 * `remarkInclude`, so it also covers `<include>`d sections, and keeps GFM
 * table padding aligned to the replaced text.
 */
export function remarkMdxIcons() {
  return (tree: MdastNode) => {
    replaceIconNodes(tree);
  };
}
