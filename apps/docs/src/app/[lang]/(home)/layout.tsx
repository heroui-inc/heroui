import type {ReactNode} from "react";

import {HomeLayout} from "fumadocs-ui/layouts/home";
import {notFound} from "next/navigation";

import {baseOptions} from "@/app/[lang]/layout.config";
import {DesignThemeSelector} from "@/components/design-theme-selector";
import {LanguageToggleSlot, LanguageToggleText} from "@/components/fumadocs/ui/language-toggle";
import {SearchToggle} from "@/components/fumadocs/ui/search-toggle";
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
      links={[
        ...getHomeLayoutLinks(dict, lang),
        {
          children: (
            <div className="flex items-center gap-1.5">
              <DesignThemeSelector />
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
      slots={{
        languageSelect: {
          root: LanguageToggleSlot,
          text: LanguageToggleText,
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
