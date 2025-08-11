/* eslint-disable @next/next/no-sync-scripts */
import type {ReactNode} from "react";

import {RootProvider} from "fumadocs-ui/provider";
import {Inter} from "next/font/google";

import {__DEV__} from "@/utils/env";

import "./global.css";

const inter = Inter({
  subsets: ["latin"],
});

export default function Layout({children}: {children: ReactNode}) {
  return (
    <html suppressHydrationWarning className={inter.className} lang="en">
      <body className="flex min-h-screen flex-col">
        {!!__DEV__ && <script src="https://cdn.jsdelivr.net/npm/react-scan/dist/auto.global.js" />}

        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
