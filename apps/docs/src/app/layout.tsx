import type {Metadata, Viewport} from "next";
import type {ReactNode} from "react";

import {Analytics} from "@vercel/analytics/next";
import {NextProvider} from "fumadocs-core/framework/next";
import {TreeContextProvider} from "fumadocs-ui/contexts/tree";
import {Inter} from "next/font/google";
import {NuqsAdapter} from "nuqs/adapters/next/app";

import {siteConfig} from "@/config/site";
import {getOrganizationJsonLd, getSoftwareApplicationJsonLd, getWebSiteJsonLd} from "@/lib/json-ld";
import {source} from "@/lib/source";
import {__BASE_URL__} from "@/utils/env";

import {CustomRootProvider} from "./custom-root-provider";

import "./global.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function Layout({children}: {children: ReactNode}) {
  return (
    <html suppressHydrationWarning className={inter.variable} lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{__html: JSON.stringify(getOrganizationJsonLd())}}
          type="application/ld+json"
        />
        <script
          dangerouslySetInnerHTML={{__html: JSON.stringify(getWebSiteJsonLd())}}
          type="application/ld+json"
        />
        <script
          dangerouslySetInnerHTML={{__html: JSON.stringify(getSoftwareApplicationJsonLd())}}
          type="application/ld+json"
        />
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <NuqsAdapter>
          <NextProvider>
            <TreeContextProvider tree={source.pageTree}>
              <CustomRootProvider>{children}</CustomRootProvider>
            </TreeContextProvider>
          </NextProvider>
        </NuqsAdapter>
        <Analytics />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  alternates: {
    canonical: __BASE_URL__.toString(),
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
    "React UI library",
    "React component library",
    "Tailwind CSS components",
    "accessible React components",
    "React design system",
    "best React UI library",
    "React UI kit",
    "shadcn alternative",
    "MUI alternative",
    "Chakra UI alternative",
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
    siteName: siteConfig.fullName,
    type: "website",
    url: __BASE_URL__.toString(),
  },
  robots: {
    follow: true,
    index: true,
  },
  title: {
    default: siteConfig.fullName,
    template: `%s | ${siteConfig.name}`,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@hero_ui",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    title: siteConfig.fullName,
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
