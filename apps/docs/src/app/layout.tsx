import type {Metadata, Viewport} from "next";
import type {ReactNode} from "react";

import {Analytics} from "@vercel/analytics/next";
import {NextProvider} from "fumadocs-core/framework/next";
import {TreeContextProvider} from "fumadocs-ui/contexts/tree";
import {Inter} from "next/font/google";

import {siteConfig} from "@/config/site";
import {source} from "@/lib/source";
import {__BASE_URL__} from "@/utils/env";

import {CustomRootProvider} from "./custom-root-provider";

import "./global.css";

const inter = Inter({
  subsets: ["latin"],
});

export default function Layout({children}: {children: ReactNode}) {
  return (
    <html suppressHydrationWarning className={inter.className} lang="en">
      <body className="flex min-h-screen flex-col">
        <NextProvider>
          <TreeContextProvider tree={source.pageTree}>
            <CustomRootProvider>{children}</CustomRootProvider>
          </TreeContextProvider>
        </NextProvider>
        <Analytics />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [
        {
          title: "HeroUI RSS Feed",
          url: "/rss.xml",
        },
      ],
    },
  },
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  description: siteConfig.description,
  icons: [
    {
      rel: "icon",
      type: "image/svg",
      url: "/icons/favicon.svg",
    },
    {
      rel: "apple-touch-icon",
      type: "image/png",
      url: "/icons/apple-touch-icon.png",
    },
  ],
  keywords: [
    "React",
    "Next.js",
    "NextUI",
    "Tailwind CSS",
    "HeroUI",
    "React Aria",
    "Server Components",
    "React Components",
    "UI Components",
    "UI Kit",
    "UI Library",
    "UI Framework",
    "UI Design System",
  ],
  metadataBase: __BASE_URL__,
  openGraph: {
    description: siteConfig.description,
    images: [
      {
        alt: siteConfig.name,
        url: siteConfig.ogImage,
      },
    ],
    locale: "en_US",
    siteName: siteConfig.name,
    type: "website",
    url: "/",
  },
  robots: {
    follow: true,
    index: true,
  },
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@hero_ui",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    title: siteConfig.name,
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    {color: "#f4f4f5", media: "(prefers-color-scheme: light)"},
    {color: "#111111", media: "(prefers-color-scheme: dark)"},
  ],
  width: "device-width",
};
