"use client";

import dynamic from "next/dynamic";

export const FormatOptions = dynamic(
  () => import("./format-options").then((mod) => mod.FormatOptions),
  {
    ssr: false,
  },
);
