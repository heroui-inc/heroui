/* eslint-disable import/no-anonymous-default-export */
/** @type {import('next-sitemap').IConfig} */
export default {
  autoLastmod: true,
  changefreq: "daily",
  exclude: ["/api/*", "/llms.mdx/*", "/llms.txt", "/llms-full.txt", "/og/*"],
  generateIndexSitemap: true,
  generateRobotsTxt: true,
  priority: 0.7,
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        allow: "/",
        userAgent: "*",
      },
    ],
  },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://v3.heroui.com",
  sitemapSize: 5000,
};
