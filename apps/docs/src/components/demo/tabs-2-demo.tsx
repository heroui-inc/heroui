"use client";

import {Tabs} from "@heroui/react";

import {Iconify} from "@/components/iconify";
import {useDictionary} from "@/hooks/use-dictionary";

export function TabsDemo2() {
  const {demos} = useDictionary();
  const t = demos.tabs2;

  return (
    <Tabs className="w-[256px]">
      <Tabs.ListContainer>
        <Tabs.List aria-label={t.ariaLabel}>
          <Tabs.Tab className="gap-1.5" id="chats">
            <Iconify icon="gravity-ui:comment" />
            <span>{t.chats}</span>
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab className="gap-1.5" id="emails">
            <Iconify icon="gravity-ui:envelope" />
            <span>{t.emails}</span>
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
    </Tabs>
  );
}
