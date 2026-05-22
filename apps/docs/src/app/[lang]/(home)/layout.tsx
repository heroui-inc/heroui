import type {ReactNode} from "react";

import {HomeLayout} from "fumadocs-ui/layouts/home";
import {notFound} from "next/navigation";

import {baseOptions} from "@/app/[lang]/layout.config";
import {DesignThemeSelector} from "@/components/design-theme-selector";
import {GitHubLinkSmall} from "@/components/github-link";
import {getDictionary, hasLocale} from "@/lib/dictionaries";

import {getHomeLayoutLinks} from "./home-layout-links";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{lang: string}>;
}) {
  const {lang} = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <HomeLayout
      {...baseOptions}
      i18n
      links={[
        ...getHomeLayoutLinks(dict),
        {
          children: (
            <div className="flex items-center gap-1.5">
              <DesignThemeSelector dict={dict.themes} />
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
