"use client";

import {Tabs} from "@heroui/react";

import {useDictionary} from "@/hooks/use-dictionary";

export function TabsDemo1() {
  const {demos} = useDictionary();
  const t = demos.tabs1;

  return (
    <Tabs className="w-[256px]">
      <Tabs.ListContainer>
        <Tabs.List aria-label={t.ariaLabel}>
          <Tabs.Tab id="1d">
            1D
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="7d">
            7D
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="1m">
            1M
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="1y">
            1Y
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="all">
            {t.all}
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
    </Tabs>
  );
}
