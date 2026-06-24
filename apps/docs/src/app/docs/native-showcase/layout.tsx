import type {ReactNode} from "react";

import {Inter} from "next/font/google";

import "../../global.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function NativeShowcaseLayout({children}: {children: ReactNode}) {
  return (
    <html suppressHydrationWarning className={inter.variable} lang="en">
      <body className="flex min-h-screen flex-col font-sans">{children}</body>
    </html>
  );
}
