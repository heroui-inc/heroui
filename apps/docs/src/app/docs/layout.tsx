import type {ReactNode} from "react";

import {Separator} from "@heroui/react";

import {baseOptions} from "@/app/layout.config";
import {FrameworksTabs} from "@/components/frameworks-tabs";
import {DocsLayout} from "@/components/fumadocs/layouts/notebook";
import {ThemeToggle} from "@/components/fumadocs/ui/theme-toggle";
import {GitHubLinkSmall} from "@/components/github-link";
import {HeroUILogo} from "@/components/heroui-logo";
import {UserMenu} from "@/components/user-menu";
import {VersionSelector} from "@/components/version-selector";
import {source} from "@/lib/source";

export default function Layout({children}: {children: ReactNode}) {
  return (
    <DocsLayout
      tabMode="navbar"
      tree={source.pageTree}
      sidebar={{
        banner: () => (
          <div className="flex flex-col items-start justify-center gap-4 px-4 pt-4 sm:hidden">
            <div className="flex w-full items-center justify-between gap-4 pl-1">
              <HeroUILogo />
              <ThemeToggle mode="light-dark-system" />
            </div>
            <Separator />
          </div>
        ),
        collapsible: false,
        defaultOpenLevel: 0,
        footer: () => (
          <div className="px-4 pb-4 sm:hidden">
            <FrameworksTabs />
          </div>
        ),
        headerTabsProps: {
          children: <FrameworksTabs className="hidden md:flex" />,
          filterByPathname: true,
        },
        tabs: {
          transform: (tab) => {
            return {
              ...tab,
              title: (
                <div
                  aria-label={typeof tab.title === "string" ? tab.title : ""}
                  className="flex items-center gap-2"
                >
                  {tab.icon}
                  <span>{tab.title}</span>
                </div>
              ),
            };
          },
        },
      }}
      themeSwitch={{
        mode: "light-dark-system",
      }}
      {...baseOptions}
      nav={{
        ...baseOptions.nav,
        children: (
          <div className="mr-2 flex items-center gap-3 md:mr-0" id="nd-nav-actions">
            <GitHubLinkSmall />
            <UserMenu />
          </div>
        ),
        mode: "top",
        title: <HeroUILogo />,
        titleSuffix: <VersionSelector className="mt-1 hidden lg:flex" />,
        titleSuffixGap: "gap-4",
      }}
    >
      {children}
    </DocsLayout>
  );
}
