import type {ReactNode} from "react";

import {DocsLayout} from "fumadocs-ui/layouts/notebook";

import {baseOptions} from "@/app/layout.config";
import {HeroUILogo} from "@/components/heroui-logo";
import {VersionSelector} from "@/components/version-selector";
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
        children: (
          <div className="mr-2">
            <VersionSelector />
          </div>
        ),
        mode: "top",
        title: <HeroUILogo />,
      }}
    >
      {children}
    </DocsLayout>
  );
}
