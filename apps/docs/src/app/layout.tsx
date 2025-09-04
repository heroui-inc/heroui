import type {Metadata, Viewport} from "next";
import type {ReactNode} from "react";

import {RootProvider} from "fumadocs-ui/provider";
import {Inter} from "next/font/google";

import {siteConfig} from "@/config/site";
import {getBaseURL} from "@/utils/env";

import "./global.css";

const inter = Inter({
  subsets: ["latin"],
});

export default function Layout({children}: {children: ReactNode}) {
  return (
    <html suppressHydrationWarning className={inter.className} lang="en">
      <body className="flex min-h-screen flex-col">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  authors: siteConfig.author,
  creator: siteConfig.creator,
  icons: [
    {
      media: "(prefers-color-scheme: light)",
      rel: "icon",
      type: "image/svg",
      url: "/icons/favicon-dark.svg",
    },
    {
      media: "(prefers-color-scheme: dark)",
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
  metadataBase: getBaseURL(),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  width: "device-width",
};
