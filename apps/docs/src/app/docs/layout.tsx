import type {ReactNode} from "react";

import {DocsLayout} from "fumadocs-ui/layouts/notebook";

import {baseOptions} from "@/app/layout.config";
import {source} from "@/lib/source";

export default function Layout({children}: {children: ReactNode}) {
  return (
    <DocsLayout
      tree={source.pageTree}
      sidebar={{
        collapsible: false,
        defaultOpenLevel: 1,
      }}
      themeSwitch={{
        mode: "light-dark",
      }}
      {...baseOptions}
      nav={{
        ...baseOptions.nav,
        mode: "top",
      }}
    >
      {children}
    </DocsLayout>
  );
}
