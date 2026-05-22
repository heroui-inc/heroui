import type {ReactNode} from "react";

import {HomeLayout} from "fumadocs-ui/layouts/home";

import {baseOptions, homeLayoutLinks} from "@/app/layout.config";
import {DesignThemeSelector} from "@/components/design-theme-selector";
import {SearchToggle} from "@/components/fumadocs/ui/search-toggle";
import {GitHubLinkSmall} from "@/components/github-link";

export default function Layout({children}: {children: ReactNode}) {
  return (
    <HomeLayout
      {...baseOptions}
      links={[
        ...homeLayoutLinks,
        {
          children: (
            <div className="flex items-center gap-1.5">
              <DesignThemeSelector triggerVariant="ghost" />
              <GitHubLinkSmall />
            </div>
          ),
          on: "nav" as const,
          secondary: true,
          type: "custom" as const,
        },
        {
          children: <GitHubLinkSmall />,
          on: "menu" as const,
          secondary: true,
          type: "custom" as const,
        },
      ]}
      searchToggle={{
        components: {
          sm: (
            <>
              <DesignThemeSelector triggerVariant="ghost" />
              <SearchToggle hideIfDisabled className="p-2" />
            </>
          ),
        },
      }}
      themeSwitch={{
        mode: "light-dark-system",
      }}
    >
      {children}
    </HomeLayout>
  );
}
