"use client";

import type {Dictionary} from "@/lib/dictionaries";
import type {ProSearchItem} from "@/lib/pro-components";
import type {ReactNode} from "react";

import {Toast} from "@heroui/react";
import {i18nProvider} from "fumadocs-ui/i18n";
import {RootProvider} from "fumadocs-ui/provider/next";
import dynamic from "next/dynamic";

import {HeroUIDocsAgent} from "@/components/ai/heroui-docs-agent";
import {WebMCPProvider} from "@/components/ai/webmcp-provider";
import {LocaleLink} from "@/components/locale-link";
import {ProComponentsProvider} from "@/components/pro-components-provider";
import {DictionaryProvider} from "@/hooks/use-dictionary";
import {translations} from "@/lib/layout.shared";

const SearchDialog = dynamic(() => import("@/components/search-dialog"), {
  ssr: false,
});

export function CustomRootProvider({
  children,
  dict,
  lang,
  proComponents,
}: {
  children: ReactNode;
  dict: Dictionary;
  lang: string;
  proComponents: ProSearchItem[];
}) {
  return (
    <DictionaryProvider dict={dict}>
      <ProComponentsProvider items={proComponents}>
        <RootProvider
          components={{Link: LocaleLink}}
          i18n={i18nProvider(translations, lang)}
          search={{
            SearchDialog,
          }}
        >
          {children}
          {/* Global toast provider for demos using the default toast() function */}
          <Toast.Provider />

          <WebMCPProvider />
          {lang === "en" ? <HeroUIDocsAgent /> : null}
        </RootProvider>
      </ProComponentsProvider>
    </DictionaryProvider>
  );
}
