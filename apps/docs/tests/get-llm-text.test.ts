import type {ComponentsCatalog} from "@/lib/components-catalog";

import {remark} from "remark";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import {describe, expect, it} from "vitest";

import {replaceComponentsIndex} from "@/lib/components-index-markdown";
import {remarkMdxIcons, replaceMdxIcons} from "@/lib/mdx-icons-markdown";

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

describe("replaceComponentsIndex", () => {
  const catalog: ComponentsCatalog = {
    categories: [
      {
        id: "buttons",
        items: [
          {
            description: "Triggers an action",
            href: "/docs/native/components/button",
            media: {dark: "", light: "", type: "video"},
            name: "button",
            pro: false,
            title: "Button",
          },
          {
            description: "",
            href: "https://heroui.pro/docs/native/components/fab",
            media: {dark: "", light: "", type: "video"},
            name: "fab",
            pro: true,
            title: "FAB",
          },
        ],
        title: "Buttons",
      },
    ],
    platform: "native",
  };

  it("lists free and Pro components under their category headings", async () => {
    const content = 'Intro\n\n<ComponentsIndex platform="native" />';
    const platforms: string[] = [];

    await expect(
      replaceComponentsIndex(content, async (platform) => {
        platforms.push(platform);

        return catalog;
      }),
    ).resolves.toBe(
      "Intro\n\n## Buttons\n\n" +
        "- [Button](/docs/native/components/button): Triggers an action\n" +
        "- [FAB](https://heroui.pro/docs/native/components/fab) (Pro)",
    );
    expect(platforms).toEqual(["native"]);
  });

  it("leaves content without the index untouched", async () => {
    const content = "## Buttons\n\nNo index here.";

    await expect(replaceComponentsIndex(content, async () => catalog)).resolves.toBe(content);
  });
});
