import type {BaseLayoutProps} from "fumadocs-ui/layouts/shared";

import {ExternalLink} from "@/components/external-link";
import {HeroUILogo} from "@/components/heroui-logo";
import {Iconify} from "@/components/iconify";

/**
 * 共享布局配置
 *
 * 可在以下文件中分别自定义各布局：
 * 首页布局：app/(home)/layout.tsx
 * 文档布局：app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: <HeroUILogo />,
    transparentMode: "always",
  },
};

/**
 * 首页 HomeLayout 的导航链接配置
 * 用于 app/(home)/layout.tsx 与 app/not-found.tsx
 */
export const homeLayoutLinks = [
  {
    items: [
      {
        icon: <Iconify icon="book" />,
        text: "快速开始",
        url: "/docs/react/getting-started",
      },
      {
        icon: <Iconify icon="palette" />,
        text: "主题",
        url: "/themes",
      },
      {
        icon: <Iconify icon="circles-4-diamond" />,
        text: "组件",
        url: "/docs/react/components",
      },
      {
        icon: <Iconify icon="smartphone" />,
        text: "React Native",
        url: "/docs/native/getting-started",
      },
      {
        icon: <Iconify icon="rocket" />,
        text: "发布说明",
        url: "/docs/react/releases",
      },
    ],
    on: "menu" as const,
    text: "文档导航",
    type: "menu" as const,
  },
  {
    items: [
      {
        external: true,
        icon: <Iconify icon="figma" />,
        text: "Figma",
        url: "https://www.figma.com/community/file/1546526812159103429",
      },
      {
        external: true,
        icon: <Iconify icon="route" />,
        text: "路线图",
        url: "https://herouiv3.featurebase.app/roadmap",
      },
    ],
    on: "menu" as const,
    text: "资源",
    type: "menu" as const,
  },
  {
    active: "none" as const,
    on: "nav" as const,
    text: "文档",
    url: "/docs/react/getting-started",
  },
  {
    active: "none" as const,
    on: "nav" as const,
    text: "主题",
    url: "/themes",
  },
  {
    active: "none" as const,
    on: "nav" as const,
    text: "组件",
    url: "/docs/react/components",
  },
  {
    active: "nested-url" as const,
    on: "nav" as const,
    text: "React Native",
    url: "/docs/native/getting-started",
  },
  // {
  //   active: "nested-url" as const,
  //   on: "nav" as const,
  //   text: "展示",
  //   url: "/showcase",
  // },
  {
    children: <ExternalLink href="https://herouiv3.featurebase.app/roadmap">路线图</ExternalLink>,
    on: "nav" as const,
    type: "custom" as const,
  },

  // {
  //   active: "url",
  //   text: "Playground",
  //   url: "/playground",
  // },
  // {
  //   active: "nested-url",
  //   text: "Theming",
  //   url: "/docs/theming",
  // },
];
