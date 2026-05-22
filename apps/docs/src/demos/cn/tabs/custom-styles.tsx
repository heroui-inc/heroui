import {Tabs} from "@heroui/react";

export function CustomStyles() {
  return (
    <Tabs className="w-full max-w-lg text-center">
      <Tabs.ListContainer>
        <Tabs.List
          aria-label="选项"
          className="w-fit *:h-6 *:w-fit *:px-3 *:text-sm *:font-normal *:data-[selected=true]:text-accent-foreground"
        >
          <Tabs.Tab id="daily">
            每日
            <Tabs.Indicator className="bg-accent" />
          </Tabs.Tab>
          <Tabs.Tab id="weekly">
            每周
            <Tabs.Indicator className="bg-accent" />
          </Tabs.Tab>
          <Tabs.Tab id="bi-weekly">
            每两周
            <Tabs.Indicator className="bg-accent" />
          </Tabs.Tab>
          <Tabs.Tab id="monthly">
            每月
            <Tabs.Indicator className="bg-accent" />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
    </Tabs>
  );
}
