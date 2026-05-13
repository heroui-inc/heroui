import {__BASE_URL__, __CDN_URL__} from "@/utils/env";

export const siteConfig = {
  authors: [
    {
      name: "HeroUI",
      url: "https://x.com/hero_ui",
    },
  ],
  cdnUrl: __CDN_URL__,
  creator: "heroui-inc",
  description: "一套美观、可定制、持续维护并保持更新的组件库。",
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
  name: "HeroUI v3（前身为 NextUI）— 默认即美观，按需可定制。",
  ogImage: `/images/twitter-card.jpg`,
  ogImageNative: `/images/twitter-card-native.jpeg`,
  siteUrl: __BASE_URL__,
  supportEmail: "support@heroui.com",
};

export type SiteConfig = typeof siteConfig;
