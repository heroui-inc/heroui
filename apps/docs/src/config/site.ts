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
  description: "A set of beautiful, customizable components that stay maintained and up to date.",
  figmaCommunityFile: "https://www.figma.com/community/file/1546526812159103429",
  githubRawUrl:
    "https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs",
  githubRepo: "heroui-inc/heroui",
  githubUrl: "https://github.com/heroui-inc/heroui",
  links: {
    discord: "https://discord.gg/9b6yyZKmH4",
    github: "https://github.com/heroui-inc",
    twitter: "https://x.com/hero_ui",
  },
  name: "HeroUI v3 (Previously NextUI) - Beautiful by default, customizable by design.",
  ogImage: `/images/twitter-card.jpg`,
  siteUrl: __BASE_URL__,
  supportEmail: "support@heroui.com",
};

export type SiteConfig = typeof siteConfig;
