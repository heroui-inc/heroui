import type {ReactNode} from "react";

import {HomeLayout} from "fumadocs-ui/layouts/home";

import {getHomeLayoutLinks} from "@/app/[lang]/(home)/home-layout-links";
import {getDictionary} from "@/app/[lang]/dictionaries";
import {baseOptions} from "@/app/[lang]/layout.config";

export default async function BlogLayout({children}: {children: ReactNode}) {
  const dict = await getDictionary("en");

  return (
    <HomeLayout
      {...baseOptions}
      links={getHomeLayoutLinks(dict)}
      themeSwitch={{
        mode: "light-dark-system",
      }}
    >
      {children}
    </HomeLayout>
  );
}
