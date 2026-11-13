import type {Root} from "fumadocs-core/page-tree";

import {describe, expect, it} from "vitest";

import {getFrameworkSwitchRoute} from "@/hooks/use-current-framework";

const page = (url: string) => ({name: url, type: "page" as const, url});

const tree: Root = {
  children: [
    {
      children: [
        {
          children: [
            {name: "Overview", type: "separator"},
            page("/en/docs/react/getting-started"),
            page("/en/docs/react/getting-started/quick-start"),
            page("/en/docs/react/getting-started/frameworks"),
            {name: "Showcase", type: "page", url: "/showcase"},
          ],
          name: "Getting Started",
          root: true,
          type: "folder",
        },
        {
          children: [
            page("/en/docs/react/components"),
            page("/en/docs/react/components/button"),
            page("/en/docs/react/components/date-picker"),
          ],
          name: "Components",
          root: true,
          type: "folder",
        },
        {
          children: [
            page("/en/docs/react/releases"),
            page("/en/docs/react/releases/v3-2-7"),
            {name: "v3.0.0-beta.5", type: "page", url: "/docs/react/releases#v300-beta5"},
          ],
          name: "Releases",
          root: true,
          type: "folder",
        },
        {
          children: [page("/en/docs/react/migration"), page("/en/docs/react/migration/hooks")],
          name: "Migration",
          root: true,
          type: "folder",
        },
      ],
      name: "React",
      type: "folder",
    },
    {
      children: [
        {
          children: [
            page("/en/docs/native/getting-started"),
            page("/en/docs/native/getting-started/quick-start"),
            page("/en/docs/native/getting-started/provider"),
            {
              external: true,
              name: "Roadmap",
              type: "page",
              url: "https://example.com/en/docs/native/roadmap",
            },
          ],
          name: "Getting Started",
          root: true,
          type: "folder",
        },
        {
          children: [
            page("/en/docs/native/components"),
            page("/en/docs/native/components/button"),
            page("/en/docs/native/components/bottom-sheet"),
          ],
          name: "Components",
          root: true,
          type: "folder",
        },
        {
          children: [page("/en/docs/native/guides/intro"), page("/en/docs/native/guides/setup")],
          name: "Guides",
          type: "folder",
        },
        {
          children: [page("/en/docs/native/releases"), page("/en/docs/native/releases/v1-0-11")],
          name: "Releases",
          root: true,
          type: "folder",
        },
      ],
      name: "Native",
      type: "folder",
    },
  ],
  fallback: {
    children: [
      page("/en/docs/react/migration/agent-index"),
      page("/en/docs/native/components/hidden"),
    ],
    name: "Fallback",
  },
  name: "Docs",
};

const cnTree: Root = {
  children: [
    {
      children: [page("/cn/docs/react/components"), page("/cn/docs/react/components/button")],
      name: "组件",
      root: true,
      type: "folder",
    },
    {children: [page("/cn/docs/native/getting-started")], name: "快速开始", type: "folder"},
    {
      children: [
        page("/cn/docs/native/components"),
        page("/cn/docs/native/components/button"),
        page("/cn/docs/native/components/bottom-sheet"),
      ],
      name: "组件",
      root: true,
      type: "folder",
    },
  ],
  name: "Docs",
};

describe("getFrameworkSwitchRoute", () => {
  it.each([
    [
      "same page keeps the query",
      "native",
      "/en/docs/react/components/button",
      "?tab=1",
      "/en/docs/native/components/button?tab=1",
    ],
    [
      "same page from native",
      "web",
      "/en/docs/native/components/button",
      "",
      "/en/docs/react/components/button",
    ],
    [
      "trailing slash",
      "native",
      "/en/docs/react/components/button/",
      "",
      "/en/docs/native/components/button",
    ],
    ["section index page", "native", "/en/docs/react/components", "", "/en/docs/native/components"],
    [
      "release page opens the releases index",
      "native",
      "/en/docs/react/releases/v3-2-7",
      "",
      "/en/docs/native/releases",
    ],
    [
      "native release page keeps the query on the index",
      "web",
      "/en/docs/native/releases/v1-0-11",
      "?x=1",
      "/en/docs/react/releases?x=1",
    ],
    ["releases index", "web", "/en/docs/native/releases", "", "/en/docs/react/releases"],
    [
      "web-only component opens the section and drops the query",
      "native",
      "/en/docs/react/components/date-picker",
      "?x=1",
      "/en/docs/native/components",
    ],
    [
      "native-only component opens the section",
      "web",
      "/en/docs/native/components/bottom-sheet",
      "",
      "/en/docs/react/components",
    ],
    [
      "web-only getting-started page",
      "native",
      "/en/docs/react/getting-started/frameworks",
      "",
      "/en/docs/native/getting-started",
    ],
    [
      "deep missing page opens the nearest ancestor",
      "native",
      "/en/docs/react/components/button/extra/deep",
      "",
      "/en/docs/native/components/button",
    ],
    [
      "missing page in a section without an index",
      "native",
      "/en/docs/react/guides/missing",
      "",
      "/en/docs/native/guides/intro",
    ],
    [
      "section without an index opens its first page",
      "native",
      "/en/docs/react/guides",
      "",
      "/en/docs/native/guides/intro",
    ],
    [
      "section missing on the target platform",
      "native",
      "/en/docs/react/migration/hooks",
      "?x=1",
      "/en/docs/native/getting-started",
    ],
    [
      "page only in tree.fallback",
      "native",
      "/en/docs/react/components/hidden",
      "?x=1",
      "/en/docs/native/components/hidden?x=1",
    ],
    [
      "fallback page in a missing section",
      "native",
      "/en/docs/react/migration/agent-index",
      "",
      "/en/docs/native/getting-started",
    ],
    [
      "external link is never matched",
      "native",
      "/en/docs/react/roadmap",
      "",
      "/en/docs/native/getting-started",
    ],
    ["platform root", "native", "/en/docs/react", "", "/en/docs/native/getting-started"],
    [
      "invalid platform segment",
      "native",
      "/en/docs/vue/components/button",
      "?x=1",
      "/en/docs/native/getting-started",
    ],
    [
      "platform segment outside docs",
      "native",
      "/en/react/components/button",
      "",
      "/en/docs/native/getting-started",
    ],
    ["non-docs page", "web", "/en/showcase", "", "/en/docs/react/getting-started"],
    [
      "unknown locale",
      "native",
      "/fr/docs/react/components/button",
      "",
      "/en/docs/native/getting-started",
    ],
  ] as const)("%s", (_name, framework, pathname, search, expected) => {
    expect(getFrameworkSwitchRoute(tree, framework, {pathname, search})).toBe(expected);
  });

  it.each([
    [
      "same page keeps the cn locale",
      "native",
      "/cn/docs/react/components/button",
      "?x=1",
      "/cn/docs/native/components/button?x=1",
    ],
    [
      "missing page opens the cn section",
      "web",
      "/cn/docs/native/components/bottom-sheet",
      "",
      "/cn/docs/react/components",
    ],
    [
      "missing section opens the cn default route",
      "native",
      "/cn/docs/react/migration",
      "",
      "/cn/docs/native/getting-started",
    ],
  ] as const)("cn: %s", (_name, framework, pathname, search, expected) => {
    expect(getFrameworkSwitchRoute(cnTree, framework, {pathname, search})).toBe(expected);
  });

  it("never matches pages from another locale", () => {
    expect(
      getFrameworkSwitchRoute(tree, "native", {pathname: "/cn/docs/react/components/button"}),
    ).toBe("/cn/docs/native/getting-started");
  });

  it("does not match section prefixes by partial segment name", () => {
    const partialTree: Root = {
      children: [page("/en/docs/native/components-extra/x")],
      name: "Docs",
    };

    expect(
      getFrameworkSwitchRoute(partialTree, "native", {pathname: "/en/docs/react/components/foo"}),
    ).toBe("/en/docs/native/getting-started");
  });

  it("opens the default route when the other releases section is missing", () => {
    const reactOnlyTree: Root = {
      children: [page("/en/docs/react/releases"), page("/en/docs/react/releases/v3-2-7")],
      name: "Docs",
    };

    expect(
      getFrameworkSwitchRoute(reactOnlyTree, "native", {
        pathname: "/en/docs/react/releases/v3-2-7",
        search: "?x=1",
      }),
    ).toBe("/en/docs/native/getting-started");
  });
});
