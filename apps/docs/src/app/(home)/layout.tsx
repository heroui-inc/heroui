import type {ReactNode} from "react";

import {HomeLayout} from "fumadocs-ui/layouts/home";

import {baseOptions, homeLayoutLinks} from "@/app/layout.config";
import {DesignThemeSelector} from "@/components/design-theme-selector";
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
              <DesignThemeSelector />
              <GitHubLinkSmall />
            </div>
          ),
          on: "all" as const,
          secondary: true,
          type: "custom" as const,
        },
      ]}
      themeSwitch={{
        mode: "light-dark-system",
      }}
    >
      {children}
    </HomeLayout>
  );
}
