import type {ReactNode} from "react";

import {DocsLayout} from "fumadocs-ui/layouts/notebook";
import {headers} from "next/headers";

import {baseOptions} from "@/app/layout.config";
import {FrameworksTabs} from "@/components/frameworks-tabs";
import {GitHubLinkSmall} from "@/components/github-link";
import {HeroUILogo} from "@/components/heroui-logo";
import {VersionSelector} from "@/components/version-selector";
import {source} from "@/lib/source";

export default async function Layout({children}: {children: ReactNode}) {
  const headersList = await headers();
  const headerUrl = headersList.get("x-url") || "";

  const currentFramework = headerUrl.includes("/docs/react") ? "react" : "native";

  return (
    <DocsLayout
      tabMode="navbar"
      tree={source.pageTree}
      sidebar={{
        banner: () => <div className="hidden" />,
        collapsible: false,
        defaultOpenLevel: 0,
        tabs: {
          transform: (tab) => {
            const isNative = tab.url.includes("/docs/native");

            if (currentFramework === "react" && isNative) {
              return null;
            }

            if (currentFramework === "native" && !isNative) {
              return null;
            }

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
          </div>
        ),
        mode: "top",
        title: (
          <div className="flex items-center gap-4">
            <HeroUILogo />
            <VersionSelector className="mt-1 hidden lg:flex" />
          </div>
        ),
      }}
    >
      <FrameworksTabs />
      {children}
    </DocsLayout>
  );
}
