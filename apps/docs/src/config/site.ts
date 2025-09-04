import {__BASE_URL__, __CDN_URL__} from "@/utils/env";

export const siteConfig = {
  authors: [
    {
      name: "hero_ui",
      url: "https://x.com/hero_ui",
    },
  ],
  cdnUrl: __CDN_URL__,
  creator: "heroui-inc",
  description:
    "Beautiful components that stay maintained, so no more copy-pasting outdated code. Fully customizable and always up-to-date to help you ship faster.",
  githubRawUrl:
    "https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs",
  links: {
    discord: "https://discord.gg/9b6yyZKmH4",
    github: "https://github.com/heroui-inc",
    twitter: "https://x.com/hero_ui",
  },
  name: "HeroUI (Previously NextUI) - The design system you don't have to build",
  ogImage: `/open-graph.png`,
  siteUrl: __BASE_URL__,
  supportEmail: "support@heroui.com",
};

export type SiteConfig = typeof siteConfig;
