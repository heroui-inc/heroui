import type {ReactNode} from "react";

import {RootProvider} from "fumadocs-ui/provider";
import {Inter} from "next/font/google";

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
