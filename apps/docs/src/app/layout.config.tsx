import type {BaseLayoutProps} from "fumadocs-ui/layouts/shared";

import {ExternalLink} from "@/components/external-link";
import {HeroUILogo} from "@/components/heroui-logo";
import {Iconify} from "@/components/iconify";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: <HeroUILogo />,
    transparentMode: "always",
  },
};

/**
 * Shared HomeLayout links configuration
 * Used in app/(home)/layout.tsx and app/not-found.tsx
 */
export const homeLayoutLinks = [
  {
    items: [
      {
        icon: <Iconify icon="book" />,
        text: "Getting Started",
        url: "/docs/react/getting-started",
      },
      {
        icon: <Iconify icon="circles-4-diamond" />,
        text: "Components",
        url: "/docs/react/components",
      },
      {
        icon: <Iconify icon="rocket" />,
        text: "Releases",
        url: "/docs/react/releases",
      },
    ],
    on: "menu" as const,
    text: "Documentation",
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
        text: "Roadmap",
        url: "https://herouiv3.featurebase.app/roadmap",
      },
      {
        external: true,
        icon: <Iconify icon="smartphone" />,
        text: "React Native",
        url: "https://link.heroui.com/native?ref=heroui-v3",
      },
    ],
    on: "menu" as const,
    text: "Resources",
    type: "menu" as const,
  },
  {
    active: "none" as const,
    on: "nav" as const,
    text: "Docs",
    url: "/docs/react/getting-started",
  },
  {
    active: "none" as const,
    on: "nav" as const,
    text: "Components",
    url: "/docs/react/components",
  },
  {
    active: "nested-url" as const,
    on: "nav" as const,
    text: "Showcase",
    url: "/showcase",
  },
  {
    children: <ExternalLink href="https://herouiv3.featurebase.app/roadmap">Roadmap</ExternalLink>,
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
