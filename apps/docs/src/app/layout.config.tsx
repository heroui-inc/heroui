import type {BaseLayoutProps} from "fumadocs-ui/layouts/shared";

import {ExternalLink} from "@/components/external-link";
import {HeroUILogo} from "@/components/heroui-logo";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  githubUrl: "https://github.com/heroui-inc/heroui",
  links: [
    {
      active: "nested-url",
      text: "Docs",
      url: "/docs",
    },
    {
      active: "nested-url",
      text: "Components",
      url: "/docs/components",
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
    {
      active: "url",
      text: "Changelog",
      url: "/docs/changelog",
    },
    {
      children: <ExternalLink href="#roadmap">Roadmap</ExternalLink>,
      type: "custom",
    },
  ],
  nav: {
    title: <HeroUILogo />,
  },
};
