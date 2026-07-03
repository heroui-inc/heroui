import type {LinkItemType} from "@/components/fumadocs/ui/link-item";
import type {ReactNode} from "react";

import {ExternalLink} from "@/components/external-link";
import {Iconify} from "@/components/iconify";
import {i18n} from "@/lib/i18n";

export type HomeLocale = (typeof i18n)["languages"][number];

export interface HomeContent {
  releaseBadge: string;
  title: ReactNode;
  description: string;
  getStarted: string;
  viewComponents: string;
  githubStarsPrefix: string;
  githubStarsSuffix: string;
  demo: {
    proTemplate: string;
    themeBuilder: string;
  };
  nav: {
    documentation: string;
    resources: string;
    gettingStarted: string;
    themes: string;
    components: string;
    reactNative: string;
    reactNativeShort: string;
    releases: string;
    blog: string;
    docs: string;
    roadmap: string;
  };
}

const content: Record<HomeLocale, HomeContent> = {
  cn: {
    demo: {
      proTemplate: "Pro 中提供模板",
      themeBuilder: "在主题构建器中打开",
    },
    description:
      "HeroUI 是面向 Web 与移动端的现代 UI 库，助你快速迭代、保持一致，并打造令人愉悦的用户体验。",
    getStarted: "快速开始",
    githubStarsPrefix: "开源项目，已有",
    githubStarsSuffix: "颗星",
    nav: {
      blog: "博客",
      components: "组件",
      docs: "文档",
      documentation: "文档",
      gettingStarted: "快速开始",
      reactNative: "React Native",
      reactNativeShort: "Native",
      releases: "版本发布",
      resources: "资源",
      roadmap: "路线图",
      themes: "主题",
    },
    releaseBadge: "HeroUI Native v1.0.5 — 补丁版本",
    title: (
      <>
        开箱即美。<span className="text-muted/70">设计上随心可定。</span>
      </>
    ),
    viewComponents: "查看组件",
  },
  en: {
    demo: {
      proTemplate: "Available in Pro as template",
      themeBuilder: "Open in theme builder",
    },
    description:
      "HeroUI is the modern UI library for web and mobile, built to help you move fast, stay consistent, and deliver delightful user experiences.",
    getStarted: "Get started",
    githubStarsPrefix: "Open source with",
    githubStarsSuffix: "stars",
    nav: {
      blog: "Blog",
      components: "Components",
      docs: "Docs",
      documentation: "Documentation",
      gettingStarted: "Getting Started",
      reactNative: "React Native",
      reactNativeShort: "Native",
      releases: "Releases",
      resources: "Resources",
      roadmap: "Roadmap",
      themes: "Themes",
    },
    releaseBadge: "HeroUI Native v1.0.5 — patch release",
    title: (
      <>
        Beautiful by default. <span className="text-muted/70">Customizable by design.</span>
      </>
    ),
    viewComponents: "View components",
  },
};

export function getHomeLocale(lang: string): HomeLocale {
  return i18n.languages.includes(lang as HomeLocale) ? (lang as HomeLocale) : i18n.defaultLanguage;
}

export function getHomeContent(lang: string): HomeContent {
  return content[getHomeLocale(lang)];
}

export function getHomeLayoutLinks(lang: string): LinkItemType[] {
  const {nav} = getHomeContent(lang);
  const blogUrl = `/${lang}/blog`;

  return [
    {
      items: [
        {
          icon: <Iconify icon="book" />,
          text: nav.gettingStarted,
          url: "/docs/react/getting-started",
        },
        {
          icon: <Iconify icon="palette" />,
          text: nav.themes,
          url: "/themes",
        },
        {
          icon: <Iconify icon="circles-4-diamond" />,
          text: nav.components,
          url: "/docs/react/components",
        },
        {
          icon: <Iconify icon="smartphone" />,
          text: nav.reactNative,
          url: "/docs/native/getting-started",
        },
        {
          icon: <Iconify icon="rocket" />,
          text: nav.releases,
          url: "/docs/react/releases",
        },
      ],
      on: "menu",
      text: nav.documentation,
      type: "menu",
    },
    {
      items: [
        {
          icon: <Iconify icon="pen-line" />,
          text: nav.blog,
          url: blogUrl,
        },
        {
          external: true,
          icon: <Iconify icon="figma" />,
          text: "Figma",
          url: "https://www.figma.com/community/file/1546526812159103429",
        },
        {
          external: true,
          icon: <Iconify icon="route" />,
          text: nav.roadmap,
          url: "https://herouiv3.featurebase.app/roadmap",
        },
      ],
      on: "menu",
      text: nav.resources,
      type: "menu",
    },
    {
      active: "nested-url",
      on: "nav",
      text: nav.docs,
      url: "/docs/react/getting-started",
    },
    {
      active: "nested-url",
      on: "nav",
      text: nav.themes,
      url: "/themes",
    },
    {
      active: "nested-url",
      on: "nav",
      text: nav.components,
      url: "/docs/react/components",
    },
    {
      active: "nested-url",
      on: "nav",
      text: (
        <>
          <span className="md:hidden">{nav.reactNativeShort}</span>
          <span className="hidden md:inline">{nav.reactNative}</span>
        </>
      ),
      url: "/docs/native/getting-started",
    },
    {
      active: "nested-url",
      on: "nav",
      text: nav.blog,
      url: blogUrl,
    },
    {
      children: (
        <ExternalLink href="https://herouiv3.featurebase.app/roadmap">{nav.roadmap}</ExternalLink>
      ),
      on: "nav",
      type: "custom",
    },
  ];
}

/** @deprecated Use `getHomeLayoutLinks(locale)` for locale-aware navigation. */
export const homeLayoutLinks = getHomeLayoutLinks("en");
