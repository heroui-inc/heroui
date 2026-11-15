import {remark} from "remark";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import {describe, expect, it} from "vitest";

import {remarkMdxIcons, replaceMdxIcons} from "@/lib/mdx-icons-markdown";
import {replaceNativeComponentsCategories} from "@/lib/native-components-markdown";

describe("remarkMdxIcons", () => {
  it("replaces icon elements in the parsed tree", async () => {
    const content = [
      "| v2 | Status |",
      "| --- | --- |",
      "| Code | <StatusCross>Removed</StatusCross> |",
      "| Offline | <StatusCheck /> |",
      "",
      '- **<InlineIcon icon="globe" /> HeroUI v3** (web)',
    ].join("\n");
    const file = await remark().use(remarkMdx).use(remarkMdxIcons).use(remarkGfm).process(content);

    expect(String(file)).toBe(
      [
        "| v2      | Status    |",
        "| ------- | --------- |",
        "| Code    | ❌ Removed |",
        "| Offline | ✅         |",
        "",
        "* **HeroUI v3** (web)",
        "",
      ].join("\n"),
    );
  });
});

describe("replaceMdxIcons", () => {
  it("turns status icons back into the emojis they replace", () => {
    const content = [
      "| **Offline** | <StatusCross /> | <StatusCheck /> |",
      "| Code | <StatusCross /> | <StatusCross>Removed</StatusCross> |",
      "| Button | Button | <StatusCheck>Available</StatusCheck> |",
      '(<StatusWarning label="Breaking" /> **breaking change**)',
    ].join("\n");

    expect(replaceMdxIcons(content)).toBe(
      [
        "| **Offline** | ❌ | ✅ |",
        "| Code | ❌ | ❌ Removed |",
        "| Button | Button | ✅ Available |",
        "(⚠️ **breaking change**)",
      ].join("\n"),
    );
  });

  it("drops decorative inline icons", () => {
    const content =
      '- **<InlineIcon icon="globe" /> HeroUI v3** (web)\n' +
      '**[<InlineIcon icon="smartphone" className="text-current" /> Open Demo App](https://example.com)**';

    expect(replaceMdxIcons(content)).toBe(
      "- **HeroUI v3** (web)\n**[Open Demo App](https://example.com)**",
    );
  });

  it("leaves fenced code untouched", () => {
    const content =
      '<StatusCheck />\n\n```tsx\n<StatusCheck />\n<InlineIcon icon="globe" />\n```\n\n<StatusCross />';

    expect(replaceMdxIcons(content)).toBe(
      '✅\n\n```tsx\n<StatusCheck />\n<InlineIcon icon="globe" />\n```\n\n❌',
    );
  });
});

describe("replaceNativeComponentsCategories", () => {
  it("adds native component links and descriptions to the Markdown overview", () => {
    const content = '## Buttons\n\n<NativeComponentsCategory category="Buttons" />';
    const pages = [
      {
        data: {description: "Triggers an action", title: "Button"},
        path: "en/native/components/(buttons)/button.mdx",
        url: "/docs/native/components/button",
      },
      {
        data: {description: "Outside this category", title: "Input"},
        path: "en/native/components/(forms)/input.mdx",
        url: "/docs/native/components/input",
      },
    ];

    expect(replaceNativeComponentsCategories(content, pages)).toBe(
      "## Buttons\n\n- [Button](/docs/native/components/button): Triggers an action",
    );
  });

  it("keeps empty categories empty when their source pages are unavailable", () => {
    const content = '<NativeComponentsCategory category="Utilities" />';

    expect(replaceNativeComponentsCategories(content, [])).toBe("");
  });
});
