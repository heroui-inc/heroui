import React from "react";
import {Tabs} from "@heroui/react";

export function TabsDemo1() {
  return (
    <Tabs className="w-[256px]">
      <Tabs.ListContainer>
        <Tabs.List aria-label="Options">
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
            All
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
    </Tabs>
  );
}

