export type SiteConfig = typeof siteConfig;

const baseUrl = "https://alpha.heroui.com";
const cdnUrl = "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com";

export const siteConfig = {
  author: {
    email: "support@heroui.com",
    name: "HeroUI Chat",
  },
  cdnUrl,
  creator: "@hero_ui",
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
  ogImage: `${baseUrl}/twitter-card.png`,
  siteUrl: baseUrl,
  supportEmail: "support@heroui.com",
};
