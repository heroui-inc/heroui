"use client";

import type {ReactNode} from "react";

import {Toast} from "@heroui/react";
import {RootProvider} from "fumadocs-ui/provider/next";
import dynamic from "next/dynamic";

import {LocaleLink} from "@/components/locale-link";
import {i18nUI} from "@/lib/layout.shared";

const SearchDialog = dynamic(() => import("@/components/search-dialog"), {
  ssr: false,
});

export function CustomRootProvider({children, lang}: {children: ReactNode; lang: string}) {
  return (
    <RootProvider
      components={{Link: LocaleLink}}
      i18n={i18nUI.provider(lang)}
      search={{
        SearchDialog,
      }}
    >
      {children}
      {/* Global toast provider for demos using the default toast() function */}
      <Toast.Provider />
    </RootProvider>
  );
}
