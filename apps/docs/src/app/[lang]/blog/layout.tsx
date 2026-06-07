import type {ReactNode} from "react";

import {HomeLayout} from "fumadocs-ui/layouts/home";

import {getHomeLayoutLinks} from "@/app/[lang]/(home)/home-layout-links";
import {baseOptions} from "@/app/[lang]/layout.config";
import {getDictionary, hasLocale} from "@/lib/dictionaries";

export default async function BlogLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{lang: string}>;
}) {
  const {lang} = await params;
  const dict = hasLocale(lang) ? await getDictionary(lang) : await getDictionary("en");

  return (
    <HomeLayout
      {...baseOptions}
      links={getHomeLayoutLinks(dict, lang)}
      themeSwitch={{
        mode: "light-dark-system",
      }}
    >
      {children}
    </HomeLayout>
  );
}
