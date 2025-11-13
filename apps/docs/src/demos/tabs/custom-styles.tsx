import {Tabs} from "@heroui/react";

export function CustomStyles() {
  return (
    <Tabs className="w-full max-w-lg text-center">
      <Tabs.ListContainer>
        <Tabs.List
          aria-label="Options"
          className="*:data-[selected=true]:text-accent-foreground w-fit *:h-6 *:w-fit *:px-3 *:text-sm *:font-normal"
        >
          <Tabs.Tab id="daily">
            Daily
            <Tabs.Indicator className="bg-accent" />
          </Tabs.Tab>
          <Tabs.Tab id="weekly">
            Weekly
            <Tabs.Indicator className="bg-accent" />
          </Tabs.Tab>
          <Tabs.Tab id="bi-weekly">
            Bi-Weekly
            <Tabs.Indicator className="bg-accent" />
          </Tabs.Tab>
          <Tabs.Tab id="monthly">
            Monthly
            <Tabs.Indicator className="bg-accent" />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
    </Tabs>
  );
}
