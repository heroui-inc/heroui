import type {ReactNode} from "react";

import {Separator} from "@heroui/react";
import {DocsLayout} from "fumadocs-ui/layouts/notebook";

import {baseOptions} from "@/app/layout.config";
import {GitHubLinkSmall} from "@/components/github-link";
import {HeroUILogo} from "@/components/heroui-logo";
import {VersionSelector} from "@/components/version-selector";
import {source} from "@/lib/source";

export default function Layout({children}: {children: ReactNode}) {
  return (
    <DocsLayout
      tree={source.pageTree}
      sidebar={{
        collapsible: false,
        defaultOpenLevel: 0,
      }}
      themeSwitch={{
        mode: "light-dark-system",
      }}
      {...baseOptions}
      nav={{
        ...baseOptions.nav,
        children: (
          <div className="mr-2 flex items-center gap-3 md:mr-0">
            <VersionSelector className="hidden lg:flex" />
            <Separator className="hidden h-4 lg:block" orientation="vertical" />
            <GitHubLinkSmall />
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
